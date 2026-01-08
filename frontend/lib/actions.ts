"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- CONFIGURACIÓN DE CLIENTES ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Debug: Verificar si la llave maestra está cargada
if (!supabaseServiceKey) {
    console.error("🚨 ALERTA CRÍTICA: SUPABASE_SERVICE_ROLE_KEY no está definida en .env.local. Las subidas fallarán.");
}

// Cliente PÚBLICO (Solo lectura)
const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// Cliente ADMIN (Escritura con Poderes Absolutos)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

export type ActionState = {
    success: boolean;
    message: string;
};

// --- AUTH ---
export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const password = formData.get("password") as string;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24
        });
        cookieStore.delete("admin_demo");
        return { success: true, message: "OK" };
    }
    return { success: false, message: "Contraseña incorrecta" };
}

export async function enableDemoMode() {
    const cookieStore = await cookies();
    cookieStore.set("admin_demo", "true", { path: "/" });
    redirect("/admin");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    cookieStore.delete("admin_demo");
    redirect("/");
}

export async function checkAuth() {
    const cookieStore = await cookies();
    const isRealAdmin = cookieStore.has("admin_session");
    const isDemo = cookieStore.has("admin_demo");
    return { isAuth: isRealAdmin || isDemo, role: isRealAdmin ? 'admin' : isDemo ? 'demo' : null };
}

// --- PROYECTOS ---

export async function getProjects() {
    const { data } = await supabasePublic.from("projects").select("*").order("id", { ascending: false });
    return data || [];
}

// frontend/lib/actions.ts

export async function createProject(prevState: any, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const tags = formData.get("tags") as string;
        const link = formData.get("link") as string;

        // 1. CAPTURAMOS LOS ARCHIVOS POR SEPARADO
        const coverFile = formData.get("coverImage") as File; // El input de portada
        const galleryFiles = formData.getAll("galleryImages") as File[]; // El input múltiple

        if (!coverFile || coverFile.size === 0) {
            return { success: false, message: "La imagen de portada es obligatoria." };
        }

        const imageUrls: string[] = [];

        // 2. SUBIMOS PRIMERO LA PORTADA (Para asegurar que sea el index 0)
        // Nota: Agrega un timestamp al nombre para evitar duplicados/caché
        const coverName = `${Date.now()}-cover-${coverFile.name}`;
        const { data: coverData, error: coverError } = await supabaseAdmin.storage
            .from("projects") // Tu bucket
            .upload(coverName, coverFile);

        if (coverError) throw coverError;

        // Obtenemos la URL pública de la portada
        const { data: publicUrlData } = supabaseAdmin.storage.from("projects").getPublicUrl(coverName);
        imageUrls.push(publicUrlData.publicUrl);

        // 3. SUBIMOS LA GALERÍA (Si hay)
        for (const file of galleryFiles) {
            if (file.size > 0) {
                const fileName = `${Date.now()}-${file.name}`;
                const { data, error } = await supabaseAdmin.storage
                    .from("projects")
                    .upload(fileName, file);

                if (!error) {
                    const { data: urlData } = supabaseAdmin.storage.from("projects").getPublicUrl(fileName);
                    imageUrls.push(urlData.publicUrl);
                }
            }
        }

        // 4. GUARDAMOS EN BASE DE DATOS
        // El array imageUrls ahora es: [URL_PORTADA, URL_GALERIA_1, URL_GALERIA_2...]
        const { error: dbError } = await supabaseAdmin
            .from("projects")
            .insert({
                title,
                description,
                tags: tags.split(",").map(t => t.trim()), // Convertimos tags a array
                link,
                images: imageUrls, // Guardamos el array ordenado
            });

        if (dbError) throw dbError;

        revalidatePath("/"); // Actualizamos la home
        return { success: true, message: "Proyecto creado correctamente." };

    } catch (error) {
        console.error(error);
        return { success: false, message: "Error al crear el proyecto." };
    }
}

export async function deleteProject(formData: FormData) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;

    const id = formData.get("id");
    await supabaseAdmin.from("projects").delete().eq("id", id);
    revalidatePath("/admin");
}

// --- MENSAJES ---
export async function getMessages() {
    const { data } = await supabaseAdmin.from("messages").select("*").order("created_at", { ascending: false });
    return data || [];
}

export async function deleteMessage(formData: FormData) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;
    const id = formData.get("id");
    await supabaseAdmin.from("messages").delete().eq("id", id);
    revalidatePath("/admin");
}

export async function sendContactMessage(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("message") as string;
    const subject = formData.get("subject") as string || "General";

    if (!name || !email || !content) return { success: false, message: "Faltan campos." };

    const { error } = await supabaseAdmin.from("messages").insert([{ name, email, content, subject }]);

    if (error) return { success: false, message: "Error al enviar." };
    return { success: true, message: "Enviado correctamente." };
}
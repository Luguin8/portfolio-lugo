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

// 🔥 AQUÍ ESTÁ EL CAMBIO CLAVE: Subida Server-Side
export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // 1. Verificar Permisos
    const auth = await checkAuth();
    if (auth.role !== 'admin') {
        return { success: false, message: "Modo Demo: No tienes permisos para crear." };
    }

    // 2. Extraer Datos de Texto
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const project_type = formData.get("project_type") as string;
    const demo_link = formData.get("demo_link") as string;
    const repo_link = formData.get("repo_link") as string;

    // Procesar Tags
    const tagsString = formData.get("tags") as string;
    const tags = tagsString
        ? tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0)
        : [];

    // 3. Procesar IMÁGENES (Recibimos Archivos, no URLs)
    const files = formData.getAll("images") as File[];
    const uploadedUrls: string[] = [];

    if (!title || !description || files.length === 0 || files[0].size === 0) {
        return { success: false, message: "Faltan datos: Título, Descripción o Imágenes." };
    }

    try {
        // Subir cada archivo usando la LLAVE MAESTRA (Bypassing RLS)
        for (const file of files) {
            // Ignorar si no es un archivo real
            if (!(file instanceof File) || file.size === 0) continue;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const buffer = await file.arrayBuffer(); // Convertir a buffer para subir

            const { error: uploadError } = await supabaseAdmin.storage
                .from('portfolio-images')
                .upload(fileName, buffer, {
                    contentType: file.type,
                    upsert: false
                });

            if (uploadError) throw new Error(`Error subiendo imagen: ${uploadError.message}`);

            // Obtener URL pública
            const { data } = supabaseAdmin.storage.from('portfolio-images').getPublicUrl(fileName);
            uploadedUrls.push(data.publicUrl);
        }

        // 4. Insertar en Base de Datos
        const { error: dbError } = await supabaseAdmin.from("projects").insert([
            {
                title,
                description,
                project_type,
                demo_link,
                repo_link,
                tags,
                images: uploadedUrls // Guardamos las URLs que acabamos de generar
            }
        ]);

        if (dbError) throw new Error(`Error BD: ${dbError.message}`);

    } catch (error: any) {
        console.error("Error en createProject:", error);
        return { success: false, message: error.message || "Error desconocido al crear proyecto." };
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "¡Proyecto publicado correctamente!" };
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
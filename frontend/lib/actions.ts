"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- CONFIGURACIÓN DE CLIENTES ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
    console.error("🚨 ALERTA CRÍTICA: SUPABASE_SERVICE_ROLE_KEY no está definida.");
}

const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);
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

// 🔥 FUNCIÓN ACTUALIZADA: Maneja Portada y Galería
export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const auth = await checkAuth();
    if (auth.role !== 'admin') {
        return { success: false, message: "Modo Demo: No tienes permisos para crear." };
    }

    // 1. Datos de Texto
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const project_type = formData.get("project_type") as string;
    const demo_link = formData.get("demo_link") as string;
    const repo_link = formData.get("repo_link") as string;
    const tagsString = formData.get("tags") as string;

    // 2. NUEVO: Extraer Imágenes por Separado (Coincide con AdminDashboard)
    const coverFile = formData.get("coverImage") as File;       // Portada obligatoria
    const galleryFiles = formData.getAll("galleryImages") as File[]; // Galería opcional

    if (!title || !description || !coverFile || coverFile.size === 0) {
        return { success: false, message: "Faltan datos: Título, Descripción o Foto de Portada." };
    }

    try {
        const imageUrls: string[] = [];
        const bucketName = 'portfolio-images'; // Tu bucket actual

        // A) Subir Portada (Siempre va primero -> Index 0)
        const coverExt = coverFile.name.split('.').pop();
        const coverName = `${Date.now()}-cover-${Math.random().toString(36).substring(2)}.${coverExt}`;
        const coverBuffer = await coverFile.arrayBuffer();

        const { error: coverError } = await supabaseAdmin.storage
            .from(bucketName)
            .upload(coverName, coverBuffer, { contentType: coverFile.type, upsert: false });

        if (coverError) throw new Error(`Error subiendo portada: ${coverError.message}`);

        const { data: coverData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(coverName);
        imageUrls.push(coverData.publicUrl);

        // B) Subir Galería (Opcional)
        for (const file of galleryFiles) {
            if (file.size > 0) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const buffer = await file.arrayBuffer();

                const { error } = await supabaseAdmin.storage
                    .from(bucketName)
                    .upload(fileName, buffer, { contentType: file.type, upsert: false });

                if (!error) {
                    const { data } = supabaseAdmin.storage.from(bucketName).getPublicUrl(fileName);
                    imageUrls.push(data.publicUrl);
                }
            }
        }

        // 3. Insertar en Base de Datos
        const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0) : [];

        const { error: dbError } = await supabaseAdmin.from("projects").insert([
            {
                title,
                description,
                project_type,
                demo_link,
                repo_link,
                tags,
                images: imageUrls // [0] siempre será la portada
            }
        ]);

        if (dbError) throw new Error(`Error BD: ${dbError.message}`);

    } catch (error: any) {
        console.error("Error en createProject:", error);
        return { success: false, message: error.message || "Error al crear proyecto." };
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
"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // IMPORTANTE

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type ActionState = {
    success: boolean;
    message: string;
};

// --- AUTH ---
export async function loginAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const password = formData.get("password") as string;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Login Real
    if (password === adminPassword) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", { httpOnly: true, secure: true, path: "/" });
        cookieStore.delete("admin_demo"); // Borrar demo si entra como real
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
    redirect("/"); // REDIRECCIÓN FORZADA
}

export async function checkAuth() {
    const cookieStore = await cookies();
    const isRealAdmin = cookieStore.has("admin_session");
    const isDemo = cookieStore.has("admin_demo");

    return { isAuth: isRealAdmin || isDemo, role: isRealAdmin ? 'admin' : isDemo ? 'demo' : null };
}

// --- PROYECTOS ---
export async function getProjects() {
    const { data } = await supabase.from("projects").select("*").order("id", { ascending: false });
    return data || [];
}

export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // Verificar Auth antes de crear
    const auth = await checkAuth();
    if (auth.role !== 'admin') {
        return { success: false, message: "Modo Demo: No puedes guardar cambios." };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const project_type = formData.get("project_type") as string;
    const demo_link = formData.get("demo_link") as string;
    const repo_link = formData.get("repo_link") as string;
    const tagsString = formData.get("tags") as string;
    const imageUrlsString = formData.get("image_urls") as string;

    // Procesamiento seguro de Tags
    const tags = tagsString
        ? tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0)
        : [];

    const images = imageUrlsString ? JSON.parse(imageUrlsString) : [];

    if (!title || !description || images.length === 0) {
        return { success: false, message: "Faltan Título, Descripción o Imágenes." };
    }

    const { error } = await supabase.from("projects").insert([
        { title, description, project_type, demo_link, repo_link, tags, images }
    ]);

    if (error) {
        console.error(error);
        return { success: false, message: "Error Supabase: " + error.message };
    }

    revalidatePath("/");
    return { success: true, message: "¡Proyecto creado con éxito!" };
}

// --- MENSAJES ---
export async function getMessages() {
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    return data || [];
}

export async function deleteMessage(formData: FormData) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;

    const id = formData.get("id");
    await supabase.from("messages").delete().eq("id", id);
    revalidatePath("/admin");
}

export async function sendContactMessage(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("message") as string;
    const subject = formData.get("subject") as string || "General";

    if (!name || !email || !content) return { success: false, message: "Faltan campos." };

    const { error } = await supabase.from("messages").insert([{ name, email, content, subject }]);
    if (error) return { success: false, message: "Error al enviar." };

    return { success: true, message: "Enviado correctamente." };
}
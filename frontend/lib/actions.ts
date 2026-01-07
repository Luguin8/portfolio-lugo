"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// --- CONFIGURACIÓN DE CLIENTES SUPABASE ---

// 1. Cliente PÚBLICO (Para lecturas, usa la clave anónima)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// 2. Cliente PRIVADO (Para escrituras ADMIN, usa la Service Role Key)
// Si no existe la key (ej: en build time), usa la anon para que no explote, pero fallará al escribir si no se configura.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);


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
        // FIX: secure solo en producción para que funcione en localhost
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 día
        });
        // Limpiamos modo demo si entra el admin real
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
    // Lectura pública
    const { data } = await supabasePublic.from("projects").select("*").order("id", { ascending: false });
    return data || [];
}

export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // 1. Verificar Auth
    const auth = await checkAuth();
    if (auth.role !== 'admin') {
        return { success: false, message: "Modo Demo/No Autorizado: No puedes guardar cambios." };
    }

    // 2. Extraer datos
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

    // Procesar Imágenes
    const imageUrlsString = formData.get("image_urls") as string;
    const images = imageUrlsString ? JSON.parse(imageUrlsString) : [];

    // 3. Validar
    if (!title || !description || images.length === 0) {
        return { success: false, message: "Faltan datos: Título, Descripción o al menos 1 Imagen." };
    }

    // 4. INSERTAR CON CLIENTE ADMIN (Service Role)
    // Esto se salta las políticas RLS restrictivas porque es el "Superusuario"
    const { error } = await supabaseAdmin.from("projects").insert([
        { title, description, project_type, demo_link, repo_link, tags, images }
    ]);

    if (error) {
        console.error("Error Supabase:", error);
        return { success: false, message: "Error DB: " + error.message };
    }

    revalidatePath("/"); // Actualizar caché
    return { success: true, message: "¡Proyecto creado con éxito!" };
}

// --- MENSAJES ---
export async function getMessages() {
    const auth = await checkAuth();
    if (!auth.isAuth) return [];
    // Usamos admin para leer mensajes por si pusiste seguridad extra
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

    // Usamos Admin aquí también para asegurar que entre aunque RLS esté estricto para anon
    const { error } = await supabaseAdmin.from("messages").insert([{ name, email, content, subject }]);

    if (error) return { success: false, message: "Error al enviar." };
    return { success: true, message: "Enviado correctamente." };
}
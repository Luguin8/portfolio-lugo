"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache"; // Para refrescar la página al instante

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export type ActionState = {
    success: boolean;
    message: string;
};

// --- LEER PROYECTOS (Para el Grid) ---
export async function getProjects() {
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("id", { ascending: false }); // Los más nuevos primero

    if (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
    return data || [];
}

// --- CREAR PROYECTO (Para el Admin) ---
export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const project_type = formData.get("project_type") as string;
    const demo_link = formData.get("demo_link") as string;
    const repo_link = formData.get("repo_link") as string;
    const tagsString = formData.get("tags") as string; // Vendrá separado por comas

    // Procesar Tags
    const tags = tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0);

    // Procesar Imágenes (URLs que vienen del cliente)
    // Nota: Subiremos las imágenes en el cliente (Admin Page) y aquí solo recibiremos las URLs
    const imageUrlsString = formData.get("image_urls") as string;
    const images = imageUrlsString ? JSON.parse(imageUrlsString) : [];

    if (!title || !description || images.length === 0) {
        return { success: false, message: "Faltan datos obligatorios (Título, Descripción o Imágenes)." };
    }

    try {
        const { error } = await supabase.from("projects").insert([
            { title, description, project_type, demo_link, repo_link, tags, images }
        ]);

        if (error) throw error;

        revalidatePath("/"); // Actualiza la home para que aparezca el proyecto nuevo
        return { success: true, message: "¡Proyecto creado con éxito!" };

    } catch (error) {
        console.error("Error creating project:", error);
        return { success: false, message: "Error al guardar en base de datos." };
    }
}

// --- CONTACTO (Mantenemos la que ya tenías) ---
export async function sendContactMessage(prevState: ActionState, formData: FormData): Promise<ActionState> {
    // ... (Mismo código de contacto de antes)
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("message") as string;
    const subject = formData.get("subject") as string || "General";

    if (!name || !email || !content) return { success: false, message: "Faltan campos." };

    const { error } = await supabase.from("messages").insert([{ name, email, content, subject }]);
    if (error) return { success: false, message: "Error al enviar." };

    return { success: true, message: "Enviado correctamente." };
}
"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
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

export async function createProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const auth = await checkAuth();
    if (auth.role !== 'admin') {
        return { success: false, message: "Modo Demo: No tienes permisos para crear." };
    }

    // 1. Datos de Texto (CON BLINDAJE PARA URLs VACÍAS)
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const project_type = formData.get("project_type") as string;

    // CORRECCIÓN: Si viene vacío (""), lo convertimos a null para que Supabase no se queje
    const rawDemo = formData.get("demo_link") as string;
    const demo_link = rawDemo && rawDemo.trim() !== "" ? rawDemo.trim() : null;

    const rawRepo = formData.get("repo_link") as string;
    const repo_link = rawRepo && rawRepo.trim() !== "" ? rawRepo.trim() : null;

    const rawDownload = formData.get("download_link") as string;
    const download_link = rawDownload && rawDownload.trim() !== "" ? rawDownload.trim() : null;

    const tagsString = formData.get("tags") as string;

    // 2. Extraer Imágenes
    const coverFile = formData.get("coverImage") as File;
    const galleryFiles = formData.getAll("galleryImages") as File[];

    if (!title || !description || !coverFile || coverFile.size === 0) {
        return { success: false, message: "Faltan datos: Título, Descripción o Foto de Portada." };
    }

    try {
        const imageUrls: string[] = [];
        const bucketName = 'portfolio-images';

        // A) Subir Portada
        const coverExt = coverFile.name.split('.').pop();
        const coverName = `${Date.now()}-cover-${Math.random().toString(36).substring(2)}.${coverExt}`;
        const coverBuffer = await coverFile.arrayBuffer();

        const { error: coverError } = await supabaseAdmin.storage
            .from(bucketName)
            .upload(coverName, coverBuffer, { contentType: coverFile.type, upsert: false });

        if (coverError) throw new Error(`Error subiendo portada: ${coverError.message}`);

        const { data: coverData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(coverName);
        imageUrls.push(coverData.publicUrl);

        // B) Subir Galería
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
                demo_link, // Ahora enviamos null si está vacío
                repo_link, // Ahora enviamos null si está vacío
                download_link,
                tags,
                images: imageUrls
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

export async function updateProject(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const auth = await checkAuth();
    if (auth.role !== 'admin') {
        return { success: false, message: "Modo Demo: No tienes permisos para editar." };
    }

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const project_type = formData.get("project_type") as string;
    
    const rawDemo = formData.get("demo_link") as string;
    const demo_link = rawDemo && rawDemo.trim() !== "" ? rawDemo.trim() : null;

    const rawRepo = formData.get("repo_link") as string;
    const repo_link = rawRepo && rawRepo.trim() !== "" ? rawRepo.trim() : null;

    const rawDownload = formData.get("download_link") as string;
    const download_link = rawDownload && rawDownload.trim() !== "" ? rawDownload.trim() : null;

    const tagsString = formData.get("tags") as string;
    const tags = tagsString ? tagsString.split(",").map(t => t.trim()).filter(t => t.length > 0) : [];

    if (!id || !title || !description) {
        return { success: false, message: "Faltan datos obligatorios." };
    }

    try {
        const { error: dbError } = await supabaseAdmin.from("projects").update({
            title,
            description,
            project_type,
            demo_link,
            repo_link,
            download_link,
            tags
        }).eq("id", id);

        if (dbError) throw new Error(`Error BD: ${dbError.message}`);
    } catch (error: any) {
        console.error("Error en updateProject:", error);
        return { success: false, message: error.message || "Error al actualizar proyecto." };
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "¡Proyecto actualizado correctamente!" };
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

// --- PIZARRÓN PRIVADO (solo dueño del sitio, nunca modo demo) ---
// Calendario (notas con fecha) + post-its + pizarra libre.
// Tablas: supabase/migrations/001_private_notes.sql, 003_board.sql
// Futuro: será el destino de sync de una app móvil 100% privada (no en este
// repo), que va a leer/escribir estas mismas tablas directo contra Supabase.
// Google Calendar: la vista de calendario es propia (no hay embed real de
// Google todavía) — para sincronizar de verdad hace falta un Client ID de
// OAuth de Google Cloud, o el link público de "Embed calendar"/iCal, que
// solo el dueño de la cuenta de Google puede generar.

export type PrivateNote = {
    id: number;
    title: string;
    content: string;
    note_date: string | null;
    created_at: string;
    kind: "note" | "postit";
    color: string | null;
};

export type BoardData = {
    notes: PrivateNote[];
    postits: PrivateNote[];
    scratch: string;
};

export async function getBoardData(): Promise<BoardData> {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return { notes: [], postits: [], scratch: "" };

    const { data: items } = await supabaseAdmin
        .from("private_notes")
        .select("*")
        .order("note_date", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

    const { data: scratchRow } = await supabaseAdmin
        .from("board_scratch")
        .select("content")
        .eq("id", 1)
        .maybeSingle();

    const all = items || [];
    return {
        notes: all.filter((n) => n.kind === "note"),
        postits: all.filter((n) => n.kind === "postit"),
        scratch: scratchRow?.content || "",
    };
}

export async function createPrivateNote(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return { success: false, message: "No autorizado." };

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const noteDateRaw = formData.get("note_date") as string;
    const note_date = noteDateRaw ? noteDateRaw : null;

    if (!title) return { success: false, message: "El título es obligatorio." };

    const { error } = await supabaseAdmin
        .from("private_notes")
        .insert([{ title, content: content || "", note_date, kind: "note" }]);

    if (error) return { success: false, message: "Error al guardar la nota." };
    revalidatePath("/admin");
    return { success: true, message: "Nota guardada." };
}

export async function deletePrivateNote(formData: FormData) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;
    const id = formData.get("id");
    await supabaseAdmin.from("private_notes").delete().eq("id", id);
    revalidatePath("/admin");
}

const POSTIT_COLORS = ["#e8c85a", "#e88a5a", "#8ac9e8", "#a8e88a", "#e88ac9"];

export async function createPostit() {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;
    const color = POSTIT_COLORS[Math.floor(Math.random() * POSTIT_COLORS.length)];
    await supabaseAdmin.from("private_notes").insert([{ title: "", content: "", kind: "postit", color }]);
    revalidatePath("/admin");
}

export async function updatePostitContent(id: number, content: string) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;
    await supabaseAdmin.from("private_notes").update({ content }).eq("id", id).eq("kind", "postit");
    revalidatePath("/admin");
}

export async function deletePostit(formData: FormData) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;
    const id = formData.get("id");
    await supabaseAdmin.from("private_notes").delete().eq("id", id).eq("kind", "postit");
    revalidatePath("/admin");
}

export async function updateScratch(content: string) {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return;
    await supabaseAdmin.from("board_scratch").update({ content, updated_at: new Date().toISOString() }).eq("id", 1);
}

// --- VISITAS (solo total + país, sin IP ni geolocalización precisa) ---
// Tabla: supabase/migrations/002_page_visits.sql

export async function trackVisit() {
    const headerList = await headers();
    const country = headerList.get("x-vercel-ip-country") || null;
    await supabaseAdmin.from("page_visits").insert([{ country }]);
}

export type VisitStats = {
    total: number;
    byCountry: { country: string; count: number }[];
};

export async function getVisitStats(): Promise<VisitStats> {
    const auth = await checkAuth();
    if (auth.role !== 'admin') return { total: 0, byCountry: [] };

    const { count } = await supabaseAdmin
        .from("page_visits")
        .select("*", { count: "exact", head: true });

    const { data } = await supabaseAdmin.from("page_visits").select("country");
    const counts: Record<string, number> = {};
    (data || []).forEach((row) => {
        const key = row.country || "Desconocido";
        counts[key] = (counts[key] || 0) + 1;
    });
    const byCountry = Object.entries(counts)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count);

    return { total: count || 0, byCountry };
}
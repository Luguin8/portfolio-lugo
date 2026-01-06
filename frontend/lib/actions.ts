"use server";

import { createClient } from "@supabase/supabase-js";

// Inicializamos el cliente SOLO para el servidor (necesita las variables de entorno)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- TIPO DE RESPUESTA ---
export type ActionState = {
    success: boolean;
    message: string;
};

// --- ACCIÓN 1: ENVIAR MENSAJE DE CONTACTO ---
export async function sendContactMessage(prevState: ActionState, formData: FormData): Promise<ActionState> {

    // 1. Extraer datos del formulario HTML
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const content = formData.get("message") as string;
    const subject = formData.get("subject") as string || "General Inquiry"; // Asunto por defecto

    // 2. Validar (Básico)
    if (!name || !email || !content) {
        return { success: false, message: "Por favor completa todos los campos obligatorios." };
    }

    try {
        // 3. Insertar en Supabase (Tabla 'messages')
        const { error } = await supabase
            .from("messages")
            .insert([
                {
                    name,
                    email,
                    content,
                    subject, // Asegúrate de que tu tabla tenga esta columna, si no, bórrala de aquí
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;

        return { success: true, message: "¡Mensaje enviado! Gracias por contactarme." };

    } catch (error) {
        console.error("Error al enviar mensaje:", error);
        return { success: false, message: "Hubo un error al enviar el mensaje. Intenta de nuevo." };
    }
}
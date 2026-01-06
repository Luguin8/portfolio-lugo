"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabaseClient"

export default function AdminPage() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const file = formData.get("image") as File
        const title = formData.get("title") as string

        try {
            // 1. Subir Imagen a Supabase Storage
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(fileName, file)

            if (uploadError) throw uploadError

            // 2. Obtener URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(fileName)

            // 3. Enviar metadatos al Backend Python (requiere Token, simplificado aquí)
            // En un caso real, obtendrías el session.access_token de supabase.auth.getSession()

            console.log("Imagen subida a:", publicUrl)
            alert("Imagen subida. Implementar fetch al backend Python aquí.")

        } catch (error) {
            console.error(error)
            alert("Error subiendo proyecto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen pt-24 px-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-mono mb-8">Admin Dashboard</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-8 rounded-xl border border-border">
                <div>
                    <label className="block text-sm font-mono mb-2">Título Proyecto</label>
                    <input name="title" type="text" className="w-full bg-background border border-border p-3 rounded text-white" required />
                </div>

                <div>
                    <label className="block text-sm font-mono mb-2">Imagen Cover</label>
                    <input name="image" type="file" className="w-full text-sm text-gray-400" required />
                </div>

                {/* Agrega más campos según ProjectCreate Schema */}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary py-3 rounded font-bold hover:bg-primary-hover disabled:opacity-50"
                >
                    {loading ? "Procesando..." : "Crear Proyecto"}
                </button>
            </form>
        </div>
    )
}
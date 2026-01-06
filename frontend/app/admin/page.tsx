"use client";

import { useState, useActionState } from "react"; // Hook nuevo
import { createClient } from "@supabase/supabase-js";
import { Upload, X, Loader2, Save, Image as ImageIcon } from "lucide-react";
import { createProject } from "@/lib/actions";
import Image from "next/image";

// Cliente Supabase SOLO para subir archivos (Client Side)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const initialState = { success: false, message: "" };

export default function AdminPage() {
    const [state, formAction, isPending] = useActionState(createProject, initialState);

    // Estados locales para manejo de archivos
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    // Subir imagen a Supabase Storage
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newUrls: string[] = [];

        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, file);

            if (uploadError) {
                alert("Error subiendo imagen: " + uploadError.message);
            } else {
                // Obtener URL pública
                const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
                newUrls.push(data.publicUrl);
            }
        }

        setUploadedUrls((prev) => [...prev, ...newUrls]);
        setUploading(false);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8 pt-24">
            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                    <Save className="text-primary" /> Crear Nuevo Proyecto
                </h1>

                <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl shadow-xl">

                    {state.success && (
                        <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg border border-green-500/50">
                            {state.message}
                        </div>
                    )}

                    <form action={formAction} className="space-y-6">

                        {/* Título */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Título del Proyecto</label>
                            <input name="title" required className="w-full bg-black/30 border border-white/10 rounded p-3 focus:border-primary focus:outline-none" placeholder="Ej: DCA King Interface" />
                        </div>

                        {/* Tipo y Links */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tipo</label>
                                <select name="project_type" className="w-full bg-black/30 border border-white/10 rounded p-3 focus:border-primary focus:outline-none">
                                    <option value="web">Web App</option>
                                    <option value="mobile">Mobile App</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Demo Link</label>
                                <input name="demo_link" className="w-full bg-black/30 border border-white/10 rounded p-3 focus:border-primary focus:outline-none" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Repo Link</label>
                                <input name="repo_link" className="w-full bg-black/30 border border-white/10 rounded p-3 focus:border-primary focus:outline-none" placeholder="https://github..." />
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tags (Separados por coma)</label>
                            <input name="tags" required className="w-full bg-black/30 border border-white/10 rounded p-3 focus:border-primary focus:outline-none" placeholder="React, Python, Docker..." />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Descripción Completa</label>
                            <textarea name="description" required rows={5} className="w-full bg-black/30 border border-white/10 rounded p-3 focus:border-primary focus:outline-none" placeholder="Detalla las tecnologías y el problema resuelto..." />
                        </div>

                        {/* SUBIDA DE IMÁGENES */}
                        <div className="border-t border-white/10 pt-6">
                            <label className="block text-xs font-mono text-gray-500 uppercase mb-4">Galería de Imágenes (La primera será portada)</label>

                            <div className="flex items-center gap-4 mb-4">
                                <label className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center gap-2 transition-colors">
                                    <Upload size={16} />
                                    <span>{uploading ? "Subiendo..." : "Seleccionar Fotos"}</span>
                                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                                </label>
                                {uploading && <Loader2 className="animate-spin text-primary" />}
                            </div>

                            {/* Preview de Imágenes */}
                            {uploadedUrls.length > 0 && (
                                <div className="grid grid-cols-4 gap-4 mb-4">
                                    {uploadedUrls.map((url, idx) => (
                                        <div key={idx} className="relative aspect-video bg-black rounded border border-white/10 overflow-hidden group">
                                            <Image src={url} alt="preview" fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setUploadedUrls(prev => prev.filter(u => u !== url))}
                                                className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Input oculto para enviar las URLs al Server Action */}
                            <input type="hidden" name="image_urls" value={JSON.stringify(uploadedUrls)} />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending || uploading || uploadedUrls.length === 0}
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isPending ? "Guardando Proyecto..." : "PUBLICAR PROYECTO"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}
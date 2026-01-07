"use client";

import { useState, useActionState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Upload, X, Loader2, Save, MessageSquare, Trash2, LogOut } from "lucide-react";
import { createProject, deleteMessage, logoutAction } from "@/lib/actions";
import Image from "next/image";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const initialState = { success: false, message: "" };

export default function AdminDashboard({ initialProjects, initialMessages, role }: { initialProjects: any[], initialMessages: any[], role: string | null }) {
    const [state, formAction, isPending] = useActionState(createProject, initialState);
    const [activeTab, setActiveTab] = useState<'projects' | 'messages'>('projects');

    // Upload Logic
    const [uploading, setUploading] = useState(false);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const files = Array.from(e.target.files);
        const newUrls: string[] = [];

        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
            if (!error) {
                const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
                newUrls.push(data.publicUrl);
            }
        }
        setUploadedUrls((prev) => [...prev, ...newUrls]);
        setUploading(false);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8 pt-24">
            <div className="max-w-5xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <span className="text-primary">Admin</span> Panel
                        {role === 'demo' && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/50">MODO DEMO</span>}
                    </h1>
                    <form action={logoutAction}>
                        <button className="flex items-center gap-2 text-red-400 hover:text-red-300 bg-red-400/10 px-4 py-2 rounded">
                            <LogOut size={16} /> Salir
                        </button>
                    </form>
                </div>

                {/* TABS */}
                <div className="flex gap-4 mb-8 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`pb-4 px-4 font-mono text-sm ${activeTab === 'projects' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
                    >
                        [+] NUEVO PROYECTO
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`pb-4 px-4 font-mono text-sm flex items-center gap-2 ${activeTab === 'messages' ? 'border-b-2 border-primary text-primary' : 'text-gray-400'}`}
                    >
                        <MessageSquare size={16} /> MENSAJES ({initialMessages.length})
                    </button>
                </div>

                {/* CONTENIDO */}
                {activeTab === 'projects' ? (
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl shadow-xl">
                        {state.success && (
                            <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg border border-green-500/50">
                                {state.message}
                            </div>
                        )}

                        <form action={formAction} className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Título</label>
                                <input name="title" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tipo</label>
                                    <select name="project_type" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white">
                                        <option value="web">Web App</option>
                                        <option value="mobile">Mobile App</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Demo Link</label>
                                    <input name="demo_link" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Repo Link</label>
                                    <input name="repo_link" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="https://github..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tags (Separados por coma)</label>
                                <input name="tags" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" placeholder="React, Python, Docker..." />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Descripción</label>
                                <textarea name="description" required rows={5} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white" />
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-4">Galería</label>
                                <div className="flex items-center gap-4 mb-4">
                                    <label className="cursor-pointer px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded flex items-center gap-2">
                                        <Upload size={16} /> <span>{uploading ? "Subiendo..." : "Seleccionar"}</span>
                                        <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
                                    </label>
                                    {uploading && <Loader2 className="animate-spin text-primary" />}
                                </div>

                                {uploadedUrls.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4 mb-4">
                                        {uploadedUrls.map((url, idx) => (
                                            <div key={idx} className="relative aspect-video bg-black rounded border border-white/10 overflow-hidden">
                                                <Image src={url} alt="preview" fill className="object-cover" />
                                                <button type="button" onClick={() => setUploadedUrls(prev => prev.filter(u => u !== url))} className="absolute top-1 right-1 bg-red-500/80 p-1 rounded-full text-white">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <input type="hidden" name="image_urls" value={JSON.stringify(uploadedUrls)} />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || uploading || role === 'demo'}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {role === 'demo' ? "DESHABILITADO EN DEMO" : isPending ? "Guardando..." : "PUBLICAR"}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* TABLA DE MENSAJES */
                    <div className="space-y-4">
                        {initialMessages.length === 0 ? (
                            <p className="text-gray-500 text-center py-10">No hay mensajes aún.</p>
                        ) : (
                            initialMessages.map((msg) => (
                                <div key={msg.id} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-bold text-white">{msg.name}</h3>
                                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">{msg.subject}</span>
                                            <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 mb-2">{msg.email}</p>
                                        <p className="text-gray-400 leading-relaxed bg-black/30 p-3 rounded">{msg.content}</p>
                                    </div>
                                    <form action={deleteMessage}>
                                        <input type="hidden" name="id" value={msg.id} />
                                        <button className="text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
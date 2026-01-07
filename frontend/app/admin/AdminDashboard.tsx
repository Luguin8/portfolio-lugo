"use client";

import { useState, useActionState, useEffect } from "react";
import { Upload, X, Loader2, MessageSquare, Trash2, LogOut, List, Monitor, Smartphone, LayoutGrid } from "lucide-react";
import { createProject, deleteMessage, deleteProject, logoutAction } from "@/lib/actions";
import Image from "next/image";

const initialState = { success: false, message: "" };

export default function AdminDashboard({ initialProjects, initialMessages, role }: { initialProjects: any[], initialMessages: any[], role: string | null }) {
    const [state, formAction, isPending] = useActionState(createProject, initialState);
    const [activeTab, setActiveTab] = useState<'create' | 'list' | 'messages'>('create');

    // Preview Logic (Solo visual, no sube nada todavía)
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    // Limpiar formulario si fue exitoso
    useEffect(() => {
        if (state.success) {
            setPreviewUrls([]);
            // Opcional: Resetear el form visualmente si quisieras
        }
    }, [state.success]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        // Generamos URLs locales solo para previsualizar
        const files = Array.from(e.target.files);
        const newUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newUrls]);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8 pt-24">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <span className="text-primary">Admin</span> Panel
                        {role === 'demo' && <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/50">MODO DEMO</span>}
                    </h1>
                    <form action={logoutAction}>
                        <button className="flex items-center gap-2 text-red-400 hover:text-red-300 bg-red-400/10 px-4 py-2 rounded transition-colors">
                            <LogOut size={16} /> Salir
                        </button>
                    </form>
                </div>

                {/* TABS */}
                <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
                    <button onClick={() => setActiveTab('create')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap ${activeTab === 'create' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                        [+] CREAR
                    </button>
                    <button onClick={() => setActiveTab('list')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'list' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                        <List size={16} /> LISTA ({initialProjects.length})
                    </button>
                    <button onClick={() => setActiveTab('messages')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'messages' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                        <MessageSquare size={16} /> MENSAJES ({initialMessages.length})
                    </button>
                </div>

                {/* --- TAB: CREAR --- */}
                {activeTab === 'create' && (
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl shadow-xl">

                        {state.message && (
                            <div className={`mb-6 p-4 rounded-lg border ${state.success ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                                {state.message}
                            </div>
                        )}

                        <form action={formAction} className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Título</label>
                                <input name="title" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tipo</label>
                                    <select name="project_type" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none">
                                        <option value="web">Web App</option>
                                        <option value="mobile">Mobile App</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Demo Link</label>
                                    <input name="demo_link" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Repo Link</label>
                                    <input name="repo_link" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="https://github..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tags (Separados por coma)</label>
                                <input name="tags" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="React, Python, Docker..." />
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Descripción</label>
                                <textarea name="description" required rows={5} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                            </div>

                            {/* SELECCIÓN DE IMÁGENES */}
                            <div className="border-t border-white/10 pt-6">
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-4">Galería de Imágenes</label>

                                <div className="flex flex-col gap-4">
                                    {/* INPUT FILE REAL: name="images" para que el server lo reciba */}
                                    <label className="cursor-pointer w-full h-32 border-2 border-dashed border-white/10 hover:border-primary/50 rounded-lg flex flex-col items-center justify-center gap-2 transition-colors bg-white/5">
                                        <Upload size={24} className="text-gray-400" />
                                        <span className="text-sm text-gray-400">Clic para seleccionar imágenes</span>
                                        <input
                                            type="file"
                                            name="images"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                    </label>

                                    {/* Previsualización (Solo visual) */}
                                    {previewUrls.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {previewUrls.map((url, idx) => (
                                                <div key={idx} className="relative aspect-video bg-black rounded border border-white/10 overflow-hidden">
                                                    <Image src={url} alt="preview" fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500">* Las imágenes seleccionadas se subirán al guardar.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || role === 'demo'}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                            >
                                {isPending && <Loader2 className="animate-spin" />}
                                {role === 'demo' ? "DESHABILITADO EN DEMO" : isPending ? "Subiendo archivos y guardando..." : "PUBLICAR PROYECTO"}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- TAB: LISTA --- */}
                {activeTab === 'list' && (
                    <div className="space-y-4">
                        {initialProjects.length === 0 ? (
                            <p className="text-gray-500 text-center py-10">No hay proyectos publicados.</p>
                        ) : (
                            initialProjects.map(project => (
                                <div key={project.id} className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center group hover:border-white/20 transition-colors">
                                    <div className="relative w-24 h-16 bg-black rounded overflow-hidden shrink-0 border border-white/10">
                                        {project.images && project.images[0] && <Image src={project.images[0]} alt={project.title} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mt-1">
                                            {project.project_type === 'web' ? <Monitor size={12} /> : <Smartphone size={12} />}
                                            <span className="uppercase">{project.project_type}</span>
                                        </div>
                                    </div>
                                    <form action={deleteProject}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <button
                                            disabled={role === 'demo'}
                                            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded border border-red-500/20 transition-colors disabled:opacity-50 cursor-pointer"
                                            onClick={(e) => { if (!confirm("¿Borrar proyecto?")) e.preventDefault(); }}
                                        >
                                            <Trash2 size={16} /> <span className="hidden md:inline">Borrar</span>
                                        </button>
                                    </form>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* --- TAB: MENSAJES --- */}
                {activeTab === 'messages' && (
                    <div className="space-y-4">
                        {initialMessages.length === 0 ? <p className="text-gray-500 text-center py-10">Sin mensajes.</p> : (
                            initialMessages.map((msg) => (
                                <div key={msg.id} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-white mb-1">{msg.name} <span className="text-xs font-normal text-gray-500">({msg.email})</span></h3>
                                        <div className="text-xs text-primary mb-2">{msg.subject}</div>
                                        <p className="text-gray-400 bg-black/30 p-3 rounded">{msg.content}</p>
                                    </div>
                                    <form action={deleteMessage}>
                                        <input type="hidden" name="id" value={msg.id} />
                                        <button disabled={role === 'demo'} className="text-gray-600 hover:text-red-500 p-2"><Trash2 size={18} /></button>
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
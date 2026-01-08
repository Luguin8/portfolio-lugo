"use client";

import { useState, useActionState, useEffect } from "react";
import { Upload, X, Loader2, MessageSquare, Trash2, LogOut, List, Monitor, Smartphone, Image as ImageIcon, LayoutTemplate } from "lucide-react";
import { createProject, deleteMessage, deleteProject, logoutAction } from "@/lib/actions";
import Image from "next/image";

const initialState = { success: false, message: "" };

export default function AdminDashboard({ initialProjects, initialMessages, role }: { initialProjects: any[], initialMessages: any[], role: string | null }) {
    const [state, formAction, isPending] = useActionState(createProject, initialState);
    const [activeTab, setActiveTab] = useState<'create' | 'list' | 'messages'>('create');

    // Estado para Previsualizaciones separadas
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    // Limpiar formulario y estados si la subida fue exitosa
    useEffect(() => {
        if (state.success) {
            setCoverPreview(null);
            setGalleryPreviews([]);
            // Resetear el formulario HTML
            const form = document.getElementById("create-project-form") as HTMLFormElement;
            if (form) form.reset();
        }
    }, [state.success]);

    // Handler para Portada
    const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Handler para Galería
    const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const files = Array.from(e.target.files);
        const newUrls = files.map(file => URL.createObjectURL(file));
        setGalleryPreviews(newUrls);
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8 pt-24">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
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
                    <button onClick={() => setActiveTab('create')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'create' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                        [+] NUEVO PROYECTO
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

                        <form id="create-project-form" action={formAction} className="space-y-6">

                            {/* SECCIÓN 1: DATOS BÁSICOS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Título del Proyecto</label>
                                        <input name="title" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="Ej: E-commerce Dashboard" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tipo</label>
                                            <select name="project_type" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none">
                                                <option value="web">Web App</option>
                                                <option value="mobile">Mobile App</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tags (Separar con comas)</label>
                                            <input name="tags" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="React, Node, SQL..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Descripción</label>
                                        <textarea name="description" required rows={4} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                    </div>
                                </div>

                                {/* SECCIÓN 2: LINKS */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Demo Link (URL)</label>
                                        <input name="demo_link" type="url" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Repo Link (GitHub)</label>
                                        <input name="repo_link" type="url" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="https://github.com/..." />
                                    </div>
                                </div>
                            </div>

                            {/* SECCIÓN 3: IMÁGENES (SPLIT INPUTS) */}
                            <div className="border-t border-white/10 pt-8 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                                {/* 3.1 PORTADA (Input Único) */}
                                <div className="md:col-span-1 space-y-2">
                                    <label className="text-xs font-mono text-primary uppercase flex items-center gap-2">
                                        <LayoutTemplate size={14} /> 01. Foto de Portada (Obligatoria)
                                    </label>
                                    <label className={`cursor-pointer aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden group ${coverPreview ? 'border-primary/50' : 'border-white/20 hover:bg-white/5'}`}>
                                        {coverPreview ? (
                                            <>
                                                <Image src={coverPreview} alt="Cover" fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                    <span className="text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-sm">Cambiar Portada</span>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <ImageIcon size={24} className="text-gray-400" />
                                                <span className="text-xs text-gray-500 text-center px-4">Click para subir Portada</span>
                                            </>
                                        )}
                                        <input type="file" name="coverImage" accept="image/*" required onChange={handleCoverSelect} className="hidden" />
                                    </label>
                                </div>

                                {/* 3.2 GALERÍA (Input Múltiple) */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase flex items-center gap-2">
                                        <Upload size={14} /> 02. Galería / Detalles (Opcional)
                                    </label>
                                    <label className="cursor-pointer w-full h-32 border-2 border-dashed border-white/10 hover:border-primary/50 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors bg-white/5">
                                        <Upload size={24} className="text-gray-400" />
                                        <span className="text-sm text-gray-400">Seleccionar múltiples imágenes...</span>
                                        <input type="file" name="galleryImages" multiple accept="image/*" onChange={handleGallerySelect} className="hidden" />
                                    </label>

                                    {/* Grid de Previsualización de Galería */}
                                    {galleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mt-4 animate-in fade-in slide-in-from-bottom-2">
                                            {galleryPreviews.map((url, idx) => (
                                                <div key={idx} className="relative aspect-video bg-black rounded border border-white/10 overflow-hidden">
                                                    <Image src={url} alt="preview" fill className="object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || role === 'demo'}
                                className="w-full py-4 mt-8 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                            >
                                {isPending && <Loader2 className="animate-spin" />}
                                {role === 'demo' ? "FUNCIÓN DESHABILITADA (DEMO)" : isPending ? "Publicando Proyecto..." : "PUBLICAR PROYECTO"}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- TAB: LISTA --- */}
                {activeTab === 'list' && (
                    <div className="space-y-4">
                        {initialProjects.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <p className="text-gray-500">No hay proyectos publicados.</p>
                            </div>
                        ) : (
                            initialProjects.map(project => (
                                <div key={project.id} className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center group hover:border-white/20 transition-colors">
                                    <div className="relative w-24 h-16 bg-black rounded-lg overflow-hidden shrink-0 border border-white/10">
                                        {project.images && project.images[0] && <Image src={project.images[0]} alt={project.title} fill className="object-cover" />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white text-lg">{project.title}</h3>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 font-mono mt-1">
                                            <span className="flex items-center gap-1 uppercase bg-white/5 px-2 py-0.5 rounded">
                                                {project.project_type === 'web' ? <Monitor size={10} /> : <Smartphone size={10} />}
                                                {project.project_type}
                                            </span>
                                            <span>{project.tags?.length || 0} tags</span>
                                        </div>
                                    </div>
                                    <form action={deleteProject}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <button
                                            disabled={role === 'demo'}
                                            className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded border border-red-500/20 transition-colors disabled:opacity-50 cursor-pointer"
                                            onClick={(e) => { if (!confirm("¿Estás seguro de eliminar este proyecto permanentemente?")) e.preventDefault(); }}
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
                        {initialMessages.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <p className="text-gray-500">Bandeja de entrada vacía.</p>
                            </div>
                        ) : (
                            initialMessages.map((msg) => (
                                <div key={msg.id} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl flex justify-between items-start gap-4 hover:border-white/20 transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-white">{msg.name}</h3>
                                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="text-xs text-primary mb-3 font-mono">{msg.email}</div>
                                        <p className="text-gray-300 bg-black/30 p-4 rounded-lg text-sm leading-relaxed border border-white/5">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <form action={deleteMessage}>
                                        <input type="hidden" name="id" value={msg.id} />
                                        <button
                                            disabled={role === 'demo'}
                                            className="text-gray-600 hover:text-red-400 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
                                            title="Eliminar mensaje"
                                        >
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
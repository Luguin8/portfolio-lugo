"use client";

import { useState, useActionState, useEffect } from "react";
import { X, Loader2, MessageSquare, Trash2, LogOut, List, Monitor, Smartphone, Edit2, Gamepad2, StickyNote } from "lucide-react";
import { updateProject, deleteMessage, deleteProject, logoutAction, createPrivateNote, deletePrivateNote, type PrivateNote } from "@/lib/actions";
import Image from "next/image";

const initialState = { success: false, message: "" };

export default function AdminDashboard({ initialProjects, initialMessages, initialNotes, role }: { initialProjects: any[], initialMessages: any[], initialNotes: PrivateNote[], role: string | null }) {
    const [updateState, updateFormAction, isUpdatePending] = useActionState(updateProject, initialState);
    const [noteState, noteFormAction, isNotePending] = useActionState(createPrivateNote, initialState);
    const [activeTab, setActiveTab] = useState<'list' | 'messages' | 'notes'>('messages');
    const [editingProject, setEditingProject] = useState<any>(null);

    useEffect(() => {
        if (updateState.success) {
            setEditingProject(null);
        }
    }, [updateState.success]);

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
                    <button onClick={() => setActiveTab('list')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'list' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                        <List size={16} /> PROYECTOS ({initialProjects.length})
                    </button>
                    <button onClick={() => setActiveTab('messages')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'messages' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                        <MessageSquare size={16} /> MENSAJES ({initialMessages.length})
                    </button>
                    {/* Solo visible para el dueño real del sitio, nunca en modo demo */}
                    {role === 'admin' && (
                        <button onClick={() => setActiveTab('notes')} className={`pb-4 px-4 font-mono text-sm whitespace-nowrap flex items-center gap-2 ${activeTab === 'notes' ? 'border-b-2 border-primary text-primary' : 'text-gray-400 hover:text-white'}`}>
                            <StickyNote size={16} /> NOTAS ({initialNotes.length})
                        </button>
                    )}
                </div>

                {/* --- TAB: LISTA --- */}
                {activeTab === 'list' && (
                    <div className="space-y-4">
                        {initialProjects.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <p className="text-gray-500">No hay proyectos en la base de datos.</p>
                                <p className="text-gray-600 text-xs mt-2 font-mono">Los proyectos se gestionan desde /lib/projects.ts</p>
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
                                                {project.project_type === 'web' ? <Monitor size={10} /> : project.project_type === 'mobile' ? <Smartphone size={10} /> : <Gamepad2 size={10} />}
                                                {project.project_type}
                                            </span>
                                            <span>{project.tags?.length || 0} tags</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setEditingProject(project)}
                                            className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded border border-blue-500/20 transition-colors cursor-pointer"
                                        >
                                            <Edit2 size={16} /> <span className="hidden md:inline">Editar</span>
                                        </button>
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

                {/* --- TAB: NOTAS PRIVADAS (solo dueño real, nunca demo) --- */}
                {activeTab === 'notes' && role === 'admin' && (
                    <div className="space-y-8">
                        <form action={noteFormAction} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl space-y-4">
                            {noteState.message && (
                                <div className={`p-3 rounded-lg border text-sm ${noteState.success ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                                    {noteState.message}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Título</label>
                                    <input name="title" required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="Nota rápida..." />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Fecha (opcional)</label>
                                    <input name="note_date" type="date" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Contenido</label>
                                <textarea name="content" rows={3} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" placeholder="Detalle..." />
                            </div>
                            <button
                                type="submit"
                                disabled={isNotePending}
                                className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded border border-primary/30 transition-colors disabled:opacity-50"
                            >
                                {isNotePending && <Loader2 size={16} className="animate-spin" />}
                                {isNotePending ? "Guardando..." : "Agregar Nota"}
                            </button>
                        </form>

                        <div className="space-y-3">
                            {initialNotes.length === 0 ? (
                                <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                    <p className="text-gray-500">Sin notas todavía.</p>
                                </div>
                            ) : (
                                initialNotes.map((note) => (
                                    <div key={note.id} className="bg-[#1a1a1a] border border-white/5 p-5 rounded-xl flex justify-between items-start gap-4 hover:border-white/20 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-white">{note.title}</h3>
                                                {note.note_date && (
                                                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                        {new Date(note.note_date + "T00:00:00").toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            {note.content && (
                                                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                                                    {note.content}
                                                </p>
                                            )}
                                        </div>
                                        <form action={deletePrivateNote}>
                                            <input type="hidden" name="id" value={note.id} />
                                            <button className="text-gray-600 hover:text-red-400 p-2 hover:bg-red-400/10 rounded-lg transition-colors" title="Eliminar nota">
                                                <Trash2 size={18} />
                                            </button>
                                        </form>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>

            {/* MODAL DE EDICIÓN */}
            {editingProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-3xl my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Edit2 size={20} className="text-primary" /> Editar Proyecto
                            </h2>
                            <button onClick={() => setEditingProject(null)} className="text-gray-500 hover:text-white p-2">
                                <X size={20} />
                            </button>
                        </div>

                        {updateState.message && (
                            <div className={`mb-6 p-4 rounded-lg border ${updateState.success ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                                {updateState.message}
                            </div>
                        )}

                        <form action={updateFormAction} className="space-y-6">
                            <input type="hidden" name="id" value={editingProject.id} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Título del Proyecto</label>
                                        <input name="title" defaultValue={editingProject.title} required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tipo</label>
                                            <select name="project_type" defaultValue={editingProject.project_type} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none">
                                                <option value="web">Web App</option>
                                                <option value="mobile">Mobile App</option>
                                                <option value="desktop">Desktop App</option>
                                                <option value="game">Videojuego</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Tags</label>
                                            <input name="tags" defaultValue={editingProject.tags?.join(', ')} required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Descripción</label>
                                        <textarea name="description" defaultValue={editingProject.description} required rows={4} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Demo Link (URL)</label>
                                        <input name="demo_link" defaultValue={editingProject.demo_link || ''} type="url" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Download Link (.exe, .apk)</label>
                                        <input name="download_link" defaultValue={editingProject.download_link || ''} type="url" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Repo Link (GitHub)</label>
                                        <input name="repo_link" defaultValue={editingProject.repo_link || ''} type="url" className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isUpdatePending || role === 'demo'}
                                className="w-full py-4 mt-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                            >
                                {isUpdatePending && <Loader2 className="animate-spin" />}
                                {role === 'demo' ? "FUNCIÓN DESHABILITADA (DEMO)" : isUpdatePending ? "Guardando..." : "GUARDAR CAMBIOS"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

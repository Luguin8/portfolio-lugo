"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, X, ExternalLink } from "lucide-react";
import {
    createPrivateNote,
    deletePrivateNote,
    createPostit,
    updatePostitContent,
    deletePostit,
    updateScratch,
    type PrivateNote,
    type BoardData,
} from "@/lib/actions";

function toDateKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
}

function getTwoWeeks(): Date[] {
    const monday = getMonday(new Date());
    return Array.from({ length: 14 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

const DAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function Board({ initialBoard }: { initialBoard: BoardData }) {
    const [notes, setNotes] = useState(initialBoard.notes);
    const [postits, setPostits] = useState(initialBoard.postits);
    const [scratch, setScratch] = useState(initialBoard.scratch);
    const [addingDay, setAddingDay] = useState<string | null>(null);
    const [quickTitle, setQuickTitle] = useState("");
    const scratchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const days = getTwoWeeks();
    const today = toDateKey(new Date());

    const notesByDay: Record<string, PrivateNote[]> = {};
    notes.forEach((n) => {
        if (!n.note_date) return;
        (notesByDay[n.note_date] ??= []).push(n);
    });

    async function handleQuickAdd(dateKey: string) {
        if (!quickTitle.trim()) {
            setAddingDay(null);
            return;
        }
        const formData = new FormData();
        formData.set("title", quickTitle.trim());
        formData.set("content", "");
        formData.set("note_date", dateKey);
        const result = await createPrivateNote({ success: false, message: "" }, formData);
        if (result.success) {
            // Optimistic-ish: refetch isn't wired here, so just append locally.
            setNotes((prev) => [
                ...prev,
                { id: Date.now(), title: quickTitle.trim(), content: "", note_date: dateKey, created_at: new Date().toISOString(), kind: "note", color: null },
            ]);
        }
        setQuickTitle("");
        setAddingDay(null);
    }

    async function handleDeleteNote(id: number) {
        setNotes((prev) => prev.filter((n) => n.id !== id));
        const fd = new FormData();
        fd.set("id", String(id));
        await deletePrivateNote(fd);
    }

    async function handleAddPostit() {
        await createPostit();
        // No local id/color known until reload; simplest safe path is a soft refresh.
        window.location.reload();
    }

    async function handlePostitBlur(id: number, content: string) {
        await updatePostitContent(id, content);
    }

    async function handleDeletePostit(id: number) {
        setPostits((prev) => prev.filter((p) => p.id !== id));
        const fd = new FormData();
        fd.set("id", String(id));
        await deletePostit(fd);
    }

    function handleScratchChange(value: string) {
        setScratch(value);
        if (scratchTimer.current) clearTimeout(scratchTimer.current);
        scratchTimer.current = setTimeout(() => {
            updateScratch(value);
        }, 900);
    }

    return (
        <div className="space-y-8">
            {/* ── CALENDARIO (2 semanas) ── */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-mono text-gray-500 uppercase">Semana actual + próxima</p>
                    <a
                        href="https://calendar.google.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary transition-colors"
                        title="La sincronización real con Google Calendar necesita credenciales OAuth tuyas — por ahora este calendario es propio."
                    >
                        <ExternalLink size={12} /> Google Calendar
                    </a>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days.map((d, i) => {
                        const key = toDateKey(d);
                        const isToday = key === today;
                        const isNextWeek = i >= 7;
                        const dayNotes = notesByDay[key] || [];
                        return (
                            <div
                                key={key}
                                className={`rounded-lg p-2 min-h-[110px] flex flex-col ${isToday ? "bg-primary/10 border border-primary/40" : "bg-black/30 border border-white/5"} ${isNextWeek ? "opacity-80" : ""}`}
                            >
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-[10px] font-mono text-gray-500 uppercase">{DAY_LABELS[i % 7]}</span>
                                    <span className={`text-xs font-bold ${isToday ? "text-primary" : "text-gray-400"}`}>{d.getDate()}</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {dayNotes.map((n) => (
                                        <div key={n.id} className="group flex items-start justify-between gap-1 bg-white/5 rounded px-1.5 py-1">
                                            <span className="text-[11px] text-gray-300 leading-tight break-words">{n.title}</span>
                                            <button
                                                onClick={() => handleDeleteNote(n.id)}
                                                className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 shrink-0"
                                            >
                                                <X size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {addingDay === key ? (
                                    <input
                                        autoFocus
                                        value={quickTitle}
                                        onChange={(e) => setQuickTitle(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleQuickAdd(key); if (e.key === "Escape") setAddingDay(null); }}
                                        onBlur={() => handleQuickAdd(key)}
                                        placeholder="Nota..."
                                        className="mt-1 w-full bg-black/40 border border-white/10 rounded text-[11px] px-1.5 py-1 text-white focus:outline-none focus:border-primary"
                                    />
                                ) : (
                                    <button
                                        onClick={() => { setAddingDay(key); setQuickTitle(""); }}
                                        className="mt-1 text-gray-600 hover:text-primary flex items-center justify-center py-0.5"
                                    >
                                        <Plus size={12} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── POST-ITS ── */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-mono text-gray-500 uppercase">Post-its</p>
                    <button
                        onClick={handleAddPostit}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary rounded border border-primary/30 transition-colors"
                    >
                        <Plus size={14} /> Agregar
                    </button>
                </div>
                {postits.length === 0 ? (
                    <p className="text-gray-600 text-sm py-6 text-center">Sin post-its todavía.</p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {postits.map((p) => (
                            <div
                                key={p.id}
                                className="w-40 h-40 p-3 rounded shadow-lg flex flex-col relative group"
                                style={{ background: p.color || "#e8c85a", transform: `rotate(${(p.id % 5) - 2}deg)` }}
                            >
                                <button
                                    onClick={() => handleDeletePostit(p.id)}
                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-black/40 hover:text-black/80"
                                >
                                    <Trash2 size={13} />
                                </button>
                                <textarea
                                    defaultValue={p.content}
                                    onBlur={(e) => handlePostitBlur(p.id, e.target.value)}
                                    placeholder="Escribí algo..."
                                    className="flex-1 w-full bg-transparent resize-none focus:outline-none text-black/80 text-sm placeholder:text-black/40"
                                    style={{ fontFamily: "var(--font-body)" }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── PIZARRA LIBRE (sin renglones) ── */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-5">
                <p className="text-xs font-mono text-gray-500 uppercase mb-4">Pizarra libre</p>
                <textarea
                    value={scratch}
                    onChange={(e) => handleScratchChange(e.target.value)}
                    placeholder="Anotá lo que quieras, sin estructura..."
                    className="w-full min-h-[280px] bg-black/30 border border-white/10 rounded-lg p-5 text-white text-base leading-relaxed resize-y focus:outline-none focus:border-primary/50"
                    style={{ fontFamily: "var(--font-body)" }}
                />
            </div>
        </div>
    );
}

"use client";

import { useState, type ReactNode } from "react";
import { LayoutDashboard, MessageSquare, BarChart3, Wallet, LogOut, Trash2 } from "lucide-react";
import { deleteMessage, logoutAction, type BoardData, type VisitStats, type MonthlyPayment } from "@/lib/actions";
import Board from "@/components/admin/Board";
import Payments from "@/components/admin/Payments";
import LoadingScreen from "@/components/LoadingScreen";

type View = "board" | "messages" | "visits" | "payments";

export default function AdminDashboard({
    initialMessages,
    initialBoard,
    initialVisitStats,
    initialPayments,
    role,
}: {
    initialMessages: any[];
    initialBoard: BoardData;
    initialVisitStats: VisitStats;
    initialPayments: MonthlyPayment[];
    role: string | null;
}) {
    const [view, setView] = useState<View>("board");

    const navButtons: { key: View; icon: ReactNode; label: string }[] = [
        { key: "board", icon: <LayoutDashboard size={16} />, label: "Pizarrón" },
        { key: "messages", icon: <MessageSquare size={16} />, label: "Mensajes" },
        { key: "visits", icon: <BarChart3 size={16} />, label: "Visitas" },
        { key: "payments", icon: <Wallet size={16} />, label: "Pagos" },
    ];

    return (
        <>
            <LoadingScreen message="Accediendo al Pizarrón..." />
            <div className="h-screen overflow-hidden bg-[#121212] text-white flex flex-col">
                {/* ── Corner nav — tiny icon cluster, no navbar ── */}
                <div className="fixed top-3 right-3 z-40 flex items-center gap-1.5 bg-[#1a1a1a]/95 backdrop-blur border border-white/10 rounded-full px-2 py-1.5 shadow-lg">
                    {role === 'demo' && (
                        <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/50 mr-1">DEMO</span>
                    )}
                    {navButtons.map((btn) => (
                        <button
                            key={btn.key}
                            onClick={() => setView(btn.key)}
                            title={btn.label}
                            className={`p-2 rounded-full transition-colors ${view === btn.key ? "bg-primary/20 text-primary" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                        >
                            {btn.icon}
                        </button>
                    ))}
                    <form action={logoutAction}>
                        <button title="Salir" className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                            <LogOut size={16} />
                        </button>
                    </form>
                </div>

                {/* ── VIEW: PIZARRÓN ── */}
                {view === "board" && (
                    <div className="flex-1 min-h-0">
                        <Board initialBoard={initialBoard} />
                    </div>
                )}

                {/* ── VIEW: MENSAJES ── */}
                {view === "messages" && (
                    <div className="flex-1 overflow-y-auto p-8 pt-16">
                        <div className="max-w-3xl mx-auto space-y-4">
                            <h2 className="text-lg font-bold text-gray-400 mb-4">Mensajes ({initialMessages.length})</h2>
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
                    </div>
                )}

                {/* ── VIEW: VISITAS (nunca demo) ── */}
                {view === "visits" && role === 'admin' && (
                    <div className="flex-1 overflow-y-auto p-8 pt-16">
                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="bg-[#1a1a1a] border border-white/5 p-8 rounded-xl text-center">
                                <p className="text-xs font-mono text-gray-500 uppercase mb-2">Visitas Totales</p>
                                <p className="text-5xl font-bold text-primary">{initialVisitStats.total}</p>
                            </div>
                            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden">
                                <p className="text-xs font-mono text-gray-500 uppercase p-4 border-b border-white/5">Por País</p>
                                {initialVisitStats.byCountry.length === 0 ? (
                                    <p className="text-gray-600 text-sm p-6">Sin datos todavía.</p>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {initialVisitStats.byCountry.map((row) => (
                                            <div key={row.country} className="flex items-center justify-between px-4 py-3">
                                                <span className="text-gray-300 text-sm">{row.country}</span>
                                                <span className="text-primary font-mono text-sm">{row.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── VIEW: PAGOS (nunca demo) ── */}
                {view === "payments" && role === 'admin' && (
                    <div className="flex-1 overflow-y-auto p-8 pt-16">
                        <Payments initialPayments={initialPayments} />
                    </div>
                )}
            </div>
        </>
    );
}

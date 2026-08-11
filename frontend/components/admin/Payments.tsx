"use client";

import { useState, useActionState, useEffect } from "react";
import { Settings, Trash2, Plus, X, Loader2 } from "lucide-react";
import { updatePayment, createPayment, deletePayment, type MonthlyPayment } from "@/lib/actions";

const initialState = { success: false, message: "" };

function formatARS(amount: number): string {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(amount);
}

export default function Payments({ initialPayments }: { initialPayments: MonthlyPayment[] }) {
    const [editState, editFormAction, isEditPending] = useActionState(updatePayment, initialState);
    const [editing, setEditing] = useState<MonthlyPayment | null>(null);

    useEffect(() => {
        if (editState.success) setEditing(null);
    }, [editState.success]);

    const total = initialPayments.reduce((sum, p) => sum + Number(p.amount_ars || 0), 0);

    async function handleAdd() {
        await createPayment();
        window.location.reload();
    }

    async function handleDelete(id: number) {
        const fd = new FormData();
        fd.set("id", String(id));
        await deletePayment(fd);
        window.location.reload();
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl flex items-center justify-between">
                <div>
                    <p className="text-xs font-mono text-gray-500 uppercase mb-1">Total mensual</p>
                    <p className="text-3xl font-bold text-primary">{formatARS(total)}</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded border border-primary/30 transition-colors"
                >
                    <Plus size={16} /> Agregar
                </button>
            </div>

            <div className="space-y-2">
                {initialPayments.map((p) => (
                    <div key={p.id} className="bg-[#1a1a1a] border border-white/5 p-4 rounded-xl flex items-center justify-between gap-4 hover:border-white/20 transition-colors">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-bold text-white">{p.name || "Sin nombre"}</h3>
                                {p.payee && <span className="text-xs text-gray-500">→ {p.payee}</span>}
                                {p.due_day && (
                                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                        Vence el {p.due_day}
                                    </span>
                                )}
                            </div>
                            {p.notes && <p className="text-xs text-gray-600 mt-1">{p.notes}</p>}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-primary text-lg">{formatARS(Number(p.amount_ars || 0))}</span>
                            <button onClick={() => setEditing(p)} className="text-gray-500 hover:text-white p-1.5 hover:bg-white/10 rounded transition-colors">
                                <Settings size={16} />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="text-gray-600 hover:text-red-400 p-1.5 hover:bg-red-400/10 rounded transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Settings size={20} className="text-primary" /> Editar Pago
                            </h2>
                            <button onClick={() => setEditing(null)} className="text-gray-500 hover:text-white p-2">
                                <X size={20} />
                            </button>
                        </div>

                        {editState.message && (
                            <div className={`mb-4 p-3 rounded-lg border text-sm ${editState.success ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-red-500/20 text-red-400 border-red-500/50'}`}>
                                {editState.message}
                            </div>
                        )}

                        <form action={editFormAction} className="space-y-4">
                            <input type="hidden" name="id" value={editing.id} />
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Nombre</label>
                                <input name="name" defaultValue={editing.name} required className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">A quién se le paga</label>
                                <input name="payee" defaultValue={editing.payee} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Monto (ARS)</label>
                                    <input name="amount_ars" type="number" step="0.01" defaultValue={editing.amount_ars} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Día de vencimiento</label>
                                    <input name="due_day" type="number" min="1" max="31" defaultValue={editing.due_day ?? ""} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Notas</label>
                                <textarea name="notes" defaultValue={editing.notes} rows={2} className="w-full bg-black/30 border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none" />
                            </div>
                            <button
                                type="submit"
                                disabled={isEditPending}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                            >
                                {isEditPending && <Loader2 size={16} className="animate-spin" />}
                                {isEditPending ? "Guardando..." : "Guardar"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

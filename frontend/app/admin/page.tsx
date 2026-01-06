"use client";

import { useSearchParams } from "next/navigation";
import { ShieldAlert, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Componente interno para leer params (necesario en Next 14/15)
function AdminPanelContent() {
    const searchParams = useSearchParams();
    const isSimulation = searchParams.get("mode") === "simulation";

    return (
        <div className="min-h-screen bg-[#121212] text-white p-8 pt-24">
            <div className="max-w-4xl mx-auto">

                {/* HEADER DEL ADMIN */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Lock className="text-primary" /> Panel de Administración
                        </h1>
                        <p className="text-gray-400">Gestión de proyectos y mensajes.</p>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                        <ArrowLeft size={16} /> Volver al sitio
                    </Link>
                </div>

                {/* ALERTA DE SIMULACIÓN */}
                {isSimulation && (
                    <div className="bg-yellow-500/10 border border-yellow-500/50 p-4 rounded-lg mb-8 flex items-start gap-3">
                        <ShieldAlert className="text-yellow-500 shrink-0 mt-1" />
                        <div>
                            <h3 className="font-bold text-yellow-500">Modo Simulación Activo</h3>
                            <p className="text-sm text-gray-300">
                                Estás viendo una versión de "Solo Lectura" del panel.
                                Las funciones de <strong>Crear</strong>, <strong>Editar</strong> y <strong>Eliminar</strong> están deshabilitadas visualmente para demostración.
                            </p>
                        </div>
                    </div>
                )}

                {/* CONTENIDO FICTICIO DEL ADMIN */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Card: Agregar Proyecto */}
                    <div className={`p-6 rounded-xl border border-white/10 bg-[#1a1a1a] ${isSimulation ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Proyecto</h2>
                        <div className="space-y-4">
                            <div className="h-10 bg-white/5 rounded w-full animate-pulse" />
                            <div className="h-24 bg-white/5 rounded w-full animate-pulse" />
                            <button disabled={isSimulation} className="w-full py-2 bg-primary text-white rounded disabled:bg-gray-700 disabled:cursor-not-allowed">
                                {isSimulation ? "Deshabilitado en Demo" : "Guardar Proyecto"}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function AdminPage() {
    return (
        <Suspense fallback={<div className="text-white p-10">Cargando panel...</div>}>
            <AdminPanelContent />
        </Suspense>
    );
}
"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/actions"; // Importamos la acción del paso 1

const initialState = {
    success: false,
    message: "",
};

export default function Contact() {
    // Hook mágico de Next.js para formularios server-side
    const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">

            {/* Fondo Decorativo */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-start">

                {/* COLUMNA IZQUIERDA: Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Hablemos de tu <span className="text-primary">Próximo Proyecto</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            ¿Tienes una idea innovadora o necesitas escalar tu arquitectura actual?
                            Estoy disponible para proyectos freelance y consultoría técnica.
                        </p>
                    </div>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Email</p>
                                <a href="mailto:lugoamartin@gmail.com" className="hover:text-white transition-colors">lugoamartin@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-primary">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">Ubicación</p>
                                <p>Corrientes, Argentina (Remote)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Formulario */}
                <div className="bg-[#1a1a1a] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">

                    {state.success ? (
                        // Mensaje de Éxito
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 z-20 bg-[#1a1a1a] flex flex-col items-center justify-center text-center p-8"
                        >
                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Recibido!</h3>
                            <p className="text-gray-400 mb-6">{state.message}</p>
                            <button
                                onClick={() => window.location.reload()} // Reset simple
                                className="text-sm text-primary hover:underline"
                            >
                                Enviar otro mensaje
                            </button>
                        </motion.div>
                    ) : null}

                    <form action={formAction} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-xs font-mono text-gray-500 uppercase">Asunto (Opcional)</label>
                            <select
                                name="subject"
                                id="subject"
                                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                            >
                                <option value="General">Consulta General</option>
                                <option value="Freelance">Proyecto Freelance</option>
                                <option value="Job Offer">Oferta Laboral</option>
                                <option value="Other">Otro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-mono text-gray-500 uppercase">Mensaje</label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={5}
                                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-primary focus:outline-none transition-colors resize-none"
                                placeholder="Cuéntame sobre tu proyecto..."
                            />
                        </div>

                        {/* Mensaje de Error (si falla el envío) */}
                        {!state.success && state.message && (
                            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded">
                                <AlertCircle size={16} />
                                {state.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Transmitiendo...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Enviar Mensaje
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactMessage } from "@/lib/actions";

const initialState = {
    success: false,
    message: "",
};

export default function Contact() {
    const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

    return (
        <section
            id="contact"
            className="py-28 px-6 relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-16 items-start">

                {/* ── LEFT: Info ── */}
                <div className="space-y-8">
                    <div>
                        <p
                            className="text-xs tracking-[0.3em] uppercase mb-3"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.28em" }}
                        >
                            ✦ &nbsp; TRANSMISIÓN
                        </p>
                        <h2
                            className="text-4xl md:text-5xl mb-4"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)" }}
                        >
                            Hablemos de tu{" "}
                            <span style={{ color: "var(--bb-white)" }}>Próximo Proyecto</span>
                        </h2>
                        <div className="bb-separator" style={{ maxWidth: "360px" }} />
                        <p
                            className="mt-5 text-lg leading-relaxed"
                            style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)", fontStyle: "italic" }}
                        >
                            ¿Tienes una idea innovadora o necesitas escalar tu arquitectura actual?
                            Estoy disponible para proyectos freelance y consultoría técnica.
                        </p>
                    </div>

                    <div className="space-y-5 pt-2">
                        {/* Email row */}
                        <div className="flex items-center gap-5">
                            <div
                                className="w-11 h-11 flex items-center justify-center shrink-0"
                                style={{ border: "1px solid var(--bb-border)", color: "var(--bb-gold)" }}
                            >
                                <Mail size={18} />
                            </div>
                            <div>
                                <p
                                    className="text-[0.6rem] tracking-[0.25em] uppercase mb-0.5"
                                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.22em" }}
                                >
                                    Email
                                </p>
                                <a
                                    href="mailto:lugoamartin@gmail.com"
                                    className="text-base transition-colors duration-200"
                                    style={{ fontFamily: "var(--font-body)", color: "var(--bb-white)" }}
                                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--bb-gold)"; }}
                                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--bb-white)"; }}
                                >
                                    lugoamartin@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Location row */}
                        <div className="flex items-center gap-5">
                            <div
                                className="w-11 h-11 flex items-center justify-center shrink-0"
                                style={{ border: "1px solid var(--bb-border)", color: "var(--bb-gold)" }}
                            >
                                <MapPin size={18} />
                            </div>
                            <div>
                                <p
                                    className="text-[0.6rem] tracking-[0.25em] uppercase mb-0.5"
                                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.22em" }}
                                >
                                    Ubicación
                                </p>
                                <p className="text-base" style={{ fontFamily: "var(--font-body)", color: "var(--bb-white)" }}>
                                    Corrientes, Argentina (Remote)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Form ── */}
                <div
                    className="bb-corner-box relative overflow-hidden"
                    style={{
                        background: "var(--bb-panel-light)",
                        border: "1px solid var(--bb-border)",
                        padding: "2rem",
                    }}
                >
                    <span className="bb-corner-tr" />
                    <span className="bb-corner-bl" />

                    {/* Success overlay */}
                    {state.success && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8"
                            style={{ background: "var(--bb-panel)" }}
                        >
                            <div
                                className="w-16 h-16 flex items-center justify-center mb-6"
                                style={{ border: "1px solid var(--bb-gold)", color: "var(--bb-gold)" }}
                            >
                                <CheckCircle2 size={32} />
                            </div>
                            <h3
                                className="text-xl mb-2"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.1em" }}
                            >
                                MENSAJE RECIBIDO
                            </h3>
                            <p className="mb-6" style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)", fontStyle: "italic" }}>
                                {state.message}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-sm transition-colors duration-200"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.15em" }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-gold-bright)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)"; }}
                            >
                                ✦ Enviar otro mensaje
                            </button>
                        </motion.div>
                    )}

                    <form action={formAction} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="name"
                                    className="block text-[0.6rem] tracking-[0.25em] uppercase"
                                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.22em" }}
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="bb-input"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="email"
                                    className="block text-[0.6rem] tracking-[0.25em] uppercase"
                                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.22em" }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="bb-input"
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="subject"
                                className="block text-[0.6rem] tracking-[0.25em] uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.22em" }}
                            >
                                Asunto
                            </label>
                            <select name="subject" id="subject" className="bb-input">
                                <option value="General">Consulta General</option>
                                <option value="Freelance">Proyecto Freelance</option>
                                <option value="Job Offer">Oferta Laboral</option>
                                <option value="Other">Otro</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="message"
                                className="block text-[0.6rem] tracking-[0.25em] uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.22em" }}
                            >
                                Mensaje
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                rows={5}
                                className="bb-input"
                                placeholder="Cuéntame sobre tu proyecto..."
                                style={{ resize: "none" }}
                            />
                        </div>

                        {/* Error */}
                        {!state.success && state.message && (
                            <div
                                className="flex items-center gap-2 text-sm p-3"
                                style={{ background: "rgba(139,26,26,0.15)", border: "1px solid rgba(139,26,26,0.40)", color: "var(--bb-crimson)", fontFamily: "var(--font-body)" }}
                            >
                                <AlertCircle size={14} />
                                {state.message}
                            </div>
                        )}

                        <div className="bb-separator my-2" />

                        <button
                            type="submit"
                            disabled={isPending}
                            className="bb-btn w-full"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Transmitiendo...
                                </>
                            ) : (
                                <>
                                    <Send size={14} />
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
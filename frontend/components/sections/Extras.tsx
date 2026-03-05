"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Languages, BookOpen, Wrench, MessageSquare } from "lucide-react";

const EDUCATION = [
    {
        title: "Licenciatura en Sistemas de Información",
        institution: "Universidad Nacional del Nordeste (UNNE)",
        status: "En curso",
        period: "Cursando actualmente",
    },
];

const EXPERIENCE = [
    {
        role: "Desarrollador Full Stack Freelance",
        type: "Autogestionado",
        period: "2022 — Actualidad",
        bullets: [
            "Desarrollo de aplicaciones web y móviles para clientes en Argentina y España.",
            "Proyectos entregados: SaaS (CAJIX), bots de trading, automatización No-Code, e-commerce widgets.",
        ],
    },
    {
        role: "Servicio Técnico de Hardware & Soporte",
        type: "Freelance · Corrientes, Argentina",
        period: "2020 — Actualidad",
        bullets: [
            "Diagnóstico, reparación y mantenimiento de hardware y software para particulares y PyMEs.",
            "Armado de PCs a medida, resolución de problemas de red, soporte remoto vía TeamViewer.",
        ],
    },
];

const LANGUAGES = [
    { lang: "Español", level: "Nativo", bar: 100 },
    { lang: "Inglés", level: "Técnico Intermedio", bar: 65, note: "Lectura fluida de documentación y manuales técnicos." },
];

export default function Extras() {
    return (
        <section
            id="extras"
            className="py-28 px-6 relative"
            style={{ borderTop: "1px solid var(--bb-border)", borderBottom: "1px solid var(--bb-border)" }}
        >
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="mb-14">
                    <p
                        className="text-xs tracking-[0.35em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.3em" }}
                    >
                        ✦ &nbsp; HISTORIA DEL CAZADOR
                    </p>
                    <h2
                        className="text-4xl md:text-5xl mb-4"
                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)" }}
                    >
                        Formación &{" "}
                        <span style={{ color: "var(--bb-white)" }}>Trayectoria</span>
                    </h2>
                    <div className="bb-separator" style={{ maxWidth: "360px" }} />
                </div>

                {/* Three-column layout */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* ── EDUCACIÓN ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-9 h-9 flex items-center justify-center shrink-0"
                                style={{ border: "1px solid var(--bb-border)", color: "var(--bb-gold)" }}
                            >
                                <GraduationCap size={16} />
                            </div>
                            <h3
                                className="text-sm tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.2em" }}
                            >
                                Educación
                            </h3>
                        </div>

                        <div className="space-y-5">
                            {EDUCATION.map((edu) => (
                                <div
                                    key={edu.title}
                                    className="bb-corner-box relative p-5"
                                    style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                                >
                                    <span className="bb-corner-tr" />
                                    {/* Status badge */}
                                    <span
                                        className="text-[0.58rem] tracking-[0.25em] uppercase mb-2 block"
                                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)" }}
                                    >
                                        {edu.period}
                                    </span>
                                    <p
                                        className="text-sm leading-snug mb-1"
                                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.04em" }}
                                    >
                                        {edu.title}
                                    </p>
                                    <div className="bb-separator my-2" />
                                    <p
                                        className="text-xs"
                                        style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                                    >
                                        {edu.institution}
                                    </p>
                                    <span
                                        className="mt-2 inline-block text-[0.58rem] tracking-widest uppercase px-2 py-0.5"
                                        style={{
                                            fontFamily: "var(--font-title)",
                                            color: "var(--bb-gold)",
                                            border: "1px solid var(--bb-gold)",
                                            letterSpacing: "0.15em",
                                        }}
                                    >
                                        {edu.status}
                                    </span>
                                </div>
                            ))}

                            {/* Self-taught note */}
                            <div
                                className="p-4"
                                style={{ border: "1px solid var(--bb-border-dim)", background: "rgba(201,168,76,0.04)" }}
                            >
                                <div className="flex items-start gap-3">
                                    <BookOpen size={14} className="mt-0.5 shrink-0" style={{ color: "var(--bb-gold)" }} />
                                    <p
                                        className="text-xs leading-relaxed"
                                        style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                                    >
                                        Formación complementaria <strong style={{ color: "var(--bb-white)" }}>100% autodidacta</strong>: documentación oficial, proyectos reales y resolución práctica de problemas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── EXPERIENCIA ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-9 h-9 flex items-center justify-center shrink-0"
                                style={{ border: "1px solid var(--bb-border)", color: "var(--bb-gold)" }}
                            >
                                <Briefcase size={16} />
                            </div>
                            <h3
                                className="text-sm tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.2em" }}
                            >
                                Experiencia
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {EXPERIENCE.map((job) => (
                                <div
                                    key={job.role}
                                    className="bb-corner-box relative p-5"
                                    style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                                >
                                    <span className="bb-corner-bl" />
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <p
                                            className="text-sm leading-snug"
                                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.04em" }}
                                        >
                                            {job.role}
                                        </p>
                                        <span
                                            className="text-[0.58rem] tracking-widest shrink-0"
                                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.1em" }}
                                        >
                                            {job.period}
                                        </span>
                                    </div>
                                    <p
                                        className="text-xs mb-3"
                                        style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                                    >
                                        {job.type}
                                    </p>
                                    <div className="bb-separator mb-3" />
                                    <ul className="space-y-1.5">
                                        {job.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span style={{ color: "var(--bb-gold)", marginTop: "2px", fontSize: "0.5rem" }}>✦</span>
                                                <p
                                                    className="text-xs leading-relaxed"
                                                    style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)" }}
                                                >
                                                    {b}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── IDIOMAS ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div
                                className="w-9 h-9 flex items-center justify-center shrink-0"
                                style={{ border: "1px solid var(--bb-border)", color: "var(--bb-gold)" }}
                            >
                                <Languages size={16} />
                            </div>
                            <h3
                                className="text-sm tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.2em" }}
                            >
                                Idiomas
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {LANGUAGES.map((lng) => (
                                <div
                                    key={lng.lang}
                                    className="bb-corner-box relative p-5"
                                    style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                                >
                                    <span className="bb-corner-tr" />
                                    <div className="flex justify-between items-center mb-2">
                                        <p
                                            className="text-sm"
                                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.08em" }}
                                        >
                                            {lng.lang}
                                        </p>
                                        <span
                                            className="text-[0.6rem] tracking-wider"
                                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.12em" }}
                                        >
                                            {lng.level}
                                        </span>
                                    </div>
                                    {/* BB-style progress bar */}
                                    <div
                                        className="h-[2px] w-full mb-2"
                                        style={{ background: "var(--bb-border)" }}
                                    >
                                        <div
                                            className="h-full transition-all duration-700"
                                            style={{ width: `${lng.bar}%`, background: "var(--bb-gold)" }}
                                        />
                                    </div>
                                    {lng.note && (
                                        <p
                                            className="text-xs mt-2"
                                            style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                                        >
                                            {lng.note}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Support tools callout */}
                            <div
                                className="p-4 mt-2"
                                style={{ border: "1px solid var(--bb-border-dim)", background: "rgba(201,168,76,0.04)" }}
                            >
                                <div className="flex items-start gap-3">
                                    <Wrench size={14} className="mt-0.5 shrink-0" style={{ color: "var(--bb-gold)" }} />
                                    <div>
                                        <p
                                            className="text-[0.6rem] tracking-widest uppercase mb-1"
                                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.18em" }}
                                        >
                                            Herramientas de Soporte
                                        </p>
                                        <p
                                            className="text-xs leading-relaxed"
                                            style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)" }}
                                        >
                                            TeamViewer · AnyDesk · SSH · Diagnóstico HW avanzado · Armado de PCs · Mantenimiento preventivo y correctivo.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* MessageSquare extra */}
                            <div
                                className="p-4"
                                style={{ border: "1px solid var(--bb-border-dim)", background: "rgba(201,168,76,0.04)" }}
                            >
                                <div className="flex items-start gap-3">
                                    <MessageSquare size={14} className="mt-0.5 shrink-0" style={{ color: "var(--bb-gold)" }} />
                                    <p
                                        className="text-xs leading-relaxed"
                                        style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                                    >
                                        Disponible para proyectos remotos internacionales. Comunicación fluida en inglés técnico escrito.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Languages, BookOpen, Wrench, MessageSquare, Globe } from "lucide-react";

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
        role: "Full Stack Developer",
        type: "Brickcode · Francia · Remoto",
        period: "May 2026 — Act.",
        bullets: [
            "Migración de autenticación a OIDC/PKCE en monorepo Nuxt/NestJS + AWS Textract OCR para facturas.",
            "Módulos corporativos (Facturación, Vehículos, Auditoría) con Vue 3, GraphQL y DDD. Migración de 6 bricks a arquitectura Factory.",
        ],
    },
    {
        role: "Desarrollador Full Stack Freelance",
        type: "Autogestionado",
        period: "2020 — Act.",
        bullets: [
            "Apps web y móviles para clientes en Argentina y España.",
            "Entregados: SaaS (CAJIX), bots de trading, automatización No-Code, e-commerce widgets.",
        ],
    },
    {
        role: "Servicio Técnico de Hardware & Soporte",
        type: "Freelance · Corrientes, AR",
        period: "2020 — Act.",
        bullets: [
            "Diagnóstico, reparación y mantenimiento de HW/SW para particulares y PyMEs.",
            "Armado de PCs a medida, redes, soporte remoto vía TeamViewer.",
        ],
    },
];

const LANGUAGES = [
    { lang: "Español", level: "Nativo", bar: 100 },
    { lang: "Inglés", level: "Técnico Intermedio", bar: 65, note: "Lectura fluida de documentación y manuales técnicos." },
];

const COL_ANIM = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
    viewport: { once: true as const },
});

function ColHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 flex items-center justify-center shrink-0 border border-bb-border text-bb-gold">
                {icon}
            </div>
            <h3 className="text-sm tracking-[0.2em] uppercase font-title text-bb-gold">{label}</h3>
        </div>
    );
}

export default function Extras() {
    return (
        <section id="extras" className="py-16 px-6 relative bb-section-edge">
            <div className="max-w-7xl mx-auto">

                {/* Section header */}
                <div className="mb-8">
                    <p className="text-xs tracking-[0.3em] uppercase mb-2 font-title text-bb-gold">
                        ✦ &nbsp; HISTORIA DEL CAZADOR
                    </p>
                    <h2 className="text-3xl md:text-4xl mb-3 font-title text-bb-gold bb-glow-text">
                        Formación &{" "}
                        <span className="text-bb-white" style={{ textShadow: "none" }}>Trayectoria</span>
                    </h2>
                    <div className="bb-separator" style={{ maxWidth: "320px" }} />
                </div>

                {/* Row 1 — three balanced columns */}
                <div className="grid md:grid-cols-3 gap-5">

                    {/* ── EDUCACIÓN ── */}
                    <motion.div {...COL_ANIM(0)}>
                        <ColHeader icon={<GraduationCap size={15} />} label="Educación" />
                        <div className="space-y-3">
                            {EDUCATION.map((edu) => (
                                <div key={edu.title} className="bb-corner-box relative p-4 bg-bb-panel border border-bb-border">
                                    <span className="bb-corner-tr" />
                                    <span className="text-[0.55rem] tracking-[0.22em] uppercase mb-1.5 block font-title text-bb-muted">
                                        {edu.period}
                                    </span>
                                    <p className="text-sm leading-snug mb-1 font-title text-bb-gold tracking-[0.04em]">
                                        {edu.title}
                                    </p>
                                    <div className="bb-separator my-1.5" />
                                    <p className="text-xs font-body italic text-bb-muted">{edu.institution}</p>
                                    <span className="mt-2 inline-block text-[0.55rem] tracking-[0.15em] uppercase px-2 py-0.5 font-title text-bb-gold border border-bb-gold">
                                        {edu.status}
                                    </span>
                                </div>
                            ))}
                            <div className="p-3 border border-bb-border-dim bg-bb-gold/5">
                                <div className="flex items-start gap-2.5">
                                    <BookOpen size={13} className="mt-0.5 shrink-0 text-bb-gold" />
                                    <p className="text-xs leading-snug font-body italic text-bb-muted">
                                        Formación complementaria <strong className="text-bb-white">100% autodidacta</strong>: documentación oficial, proyectos reales y práctica.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── EXPERIENCIA ── */}
                    <motion.div {...COL_ANIM(0.1)}>
                        <ColHeader icon={<Briefcase size={15} />} label="Experiencia" />
                        <div className="space-y-3">
                            {EXPERIENCE.map((job) => (
                                <div
                                    key={job.role}
                                    className="bb-corner-box relative p-4"
                                    style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                                >
                                    <span className="bb-corner-bl" />
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-2">
                                        <p className="text-[0.82rem] leading-snug font-title text-bb-gold tracking-[0.04em]">
                                            {job.role}
                                        </p>
                                        <span className="text-[0.55rem] tracking-[0.1em] shrink-0 font-title text-bb-muted">
                                            {job.period}
                                        </span>
                                    </div>
                                    <p className="text-[0.7rem] italic mt-0.5 mb-2 font-body text-bb-muted">{job.type}</p>
                                    <div className="bb-separator mb-2" />
                                    <ul className="space-y-1">
                                        {job.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-bb-gold mt-[3px] text-[0.4rem]">✦</span>
                                                <p className="text-[0.72rem] leading-snug font-body text-bb-muted">{b}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── IDIOMAS ── */}
                    <motion.div {...COL_ANIM(0.2)}>
                        <ColHeader icon={<Languages size={15} />} label="Idiomas" />
                        <div className="space-y-3">
                            {LANGUAGES.map((lng) => (
                                <div
                                    key={lng.lang}
                                    className="bb-corner-box relative p-4"
                                    style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                                >
                                    <span className="bb-corner-tr" />
                                    <div className="flex justify-between items-baseline mb-2">
                                        <p className="text-sm font-title text-bb-gold tracking-[0.08em]">{lng.lang}</p>
                                        <span className="text-[0.58rem] tracking-[0.12em] font-title text-bb-muted">{lng.level}</span>
                                    </div>
                                    <div className="flex gap-[3px]">
                                        {Array.from({ length: 20 }).map((_, i) => {
                                            const filled = i < Math.round(lng.bar / 5);
                                            return (
                                                <motion.div
                                                    key={i}
                                                    className="flex-1 h-[8px]"
                                                    style={{
                                                        background: filled
                                                            ? `rgba(212, 174, 82, ${Math.max(0.55, 1 - i * 0.018)})`
                                                            : "rgba(90, 70, 35, 0.22)",
                                                        boxShadow: filled ? "0 0 4px rgba(212,174,82,0.18)" : "none",
                                                    }}
                                                    initial={{ scaleY: 0 }}
                                                    whileInView={{ scaleY: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.028, duration: 0.14 }}
                                                />
                                            );
                                        })}
                                    </div>
                                    {lng.note && (
                                        <p className="text-[0.72rem] mt-2 font-body italic text-bb-muted">{lng.note}</p>
                                    )}
                                </div>
                            ))}
                            <div className="p-3 mt-1 border border-bb-border-dim bg-bb-gold/5">
                                <div className="flex items-start gap-2.5">
                                    <Globe size={13} className="mt-0.5 shrink-0 text-bb-gold" />
                                    <p className="text-[0.72rem] leading-snug font-body italic text-bb-muted">
                                        Disponible para proyectos remotos internacionales. Comunicación fluida en inglés técnico escrito.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Row 2 — support tools + soft skills, full width so the columns above stay balanced */}
                <motion.div {...COL_ANIM(0.25)} className="grid md:grid-cols-2 gap-5 mt-5">
                    <div className="p-4 border border-bb-border-dim bg-bb-gold/5">
                        <div className="flex items-start gap-2.5">
                            <Wrench size={13} className="mt-0.5 shrink-0 text-bb-gold" />
                            <div>
                                <p className="text-[0.58rem] tracking-[0.18em] uppercase mb-1 font-title text-bb-gold">
                                    Herramientas de Soporte
                                </p>
                                <p className="text-[0.72rem] leading-snug font-body text-bb-muted">
                                    TeamViewer · AnyDesk · SSH · Diagnóstico HW avanzado · Armado de PCs · Mantenimiento preventivo y correctivo.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border border-bb-border-dim bg-bb-gold/5">
                        <div className="flex items-start gap-2.5">
                            <MessageSquare size={13} className="mt-0.5 shrink-0 text-bb-gold" />
                            <div>
                                <p className="text-[0.58rem] tracking-[0.18em] uppercase mb-1.5 font-title text-bb-gold">
                                    Habilidades Blandas & Liderazgo
                                </p>
                                <p className="text-[0.72rem] leading-snug font-body text-bb-muted">
                                    <strong className="text-bb-white font-normal">Comunicación corporativa</strong> con POs y Tech Leads ·{" "}
                                    <strong className="text-bb-white font-normal">Análisis crítico</strong> de arquitectura ·{" "}
                                    <strong className="text-bb-white font-normal">Pragmatismo técnico</strong> (equilibrio calidad/plazos).
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import {
    FaReact, FaPython, FaDocker, FaNodeJs, FaGitAlt,
    FaHtml5, FaCss3Alt, FaJs, FaGithub, FaCode, FaTools, FaWindows
} from "react-icons/fa";
import {
    SiNextdotjs, SiFastapi, SiSupabase, SiTypescript, SiTailwindcss,
    SiPostgresql, SiArduino, SiExpo, SiGodotengine, SiSqlite,
    SiVercel, SiBootstrap, SiLinux, SiGoogleanalytics, SiGoogletagmanager, SiOpenai
} from "react-icons/si";
import { BarChart2, Network, Globe, Database, Wrench, Cpu, Brain, Hammer, Headphones } from "lucide-react";

const SKILL_CATEGORIES = [
    {
        title: "Frontend & Mobile",
        label: "DISCIPLINA I",
        icon: <Globe size={12} />,
        skills: [
            { name: "React.js / Next.js App Router", icon: <span className="flex gap-1"><FaReact /><SiNextdotjs /></span> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "JavaScript Vanilla (DOM Avz.)", icon: <FaJs /> },
            { name: "HTML5 & CSS3", icon: <span className="flex gap-1"><FaHtml5 /><FaCss3Alt /></span> },
            { name: "React Native (Expo)", icon: <SiExpo /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss /> },
            { name: "Bootstrap 5", icon: <SiBootstrap /> },
        ],
    },
    {
        title: "Backend & Bases de Datos",
        label: "DISCIPLINA II",
        icon: <Database size={12} />,
        skills: [
            { name: "Python (FastAPI, Scripts)", icon: <FaPython /> },
            { name: "Node.js", icon: <FaNodeJs /> },
            { name: "Supabase (Auth, DB relacional)", icon: <SiSupabase /> },
            { name: "SQLite (Mobile)", icon: <SiSqlite /> },
            { name: "IndexedDB / Dexie.js", icon: <FaCode /> },
            { name: "APIs REST / Webhooks", icon: <Network size={12} /> },
            { name: "Docker", icon: <FaDocker /> },
            { name: "Linux (Debian Servers)", icon: <SiLinux /> },
        ],
    },
    {
        title: "Arquitectura, Herramientas & Tracking",
        label: "DISCIPLINA III",
        icon: <Wrench size={12} />,
        skills: [
            { name: "Git & GitHub", icon: <span className="flex gap-1"><FaGitAlt /><FaGithub /></span> },
            { name: "Vercel / Google Play Console", icon: <SiVercel /> },
            { name: "Gestión de Dominios", icon: <Globe size={12} /> },
            { name: "Meta Graph API (WhatsApp)", icon: <Network size={12} /> },
            { name: "Google Tag Manager (GTM)", icon: <SiGoogletagmanager /> },
            { name: "Google Analytics 4 (GA4)", icon: <SiGoogleanalytics /> },
            { name: "AppSheet (No-Code)", icon: <FaTools /> },
            { name: "OpenAI / AI Dev", icon: <SiOpenai /> },
        ],
    },
    {
        title: "Análisis, Hardware & Game Dev",
        label: "DISCIPLINA IV",
        icon: <Brain size={12} />,
        skills: [
            { name: "Simulación Monte Carlo (Python)", icon: <BarChart2 size={12} /> },
            { name: "Modelado Matemático / RTP", icon: <FaCode /> },
            { name: "Arquitectura Local-First", icon: <Cpu size={12} /> },
            { name: "Background Tasks / Geoloc.", icon: <Cpu size={12} /> },
            { name: "Godot 4 (GDScript, Físicas 3D)", icon: <SiGodotengine /> },
            { name: "Diagnóstico & Reparación HW", icon: <Hammer size={12} /> },
            { name: "PC Building / Armado", icon: <FaWindows /> },
            { name: "Soporte Remoto (TeamViewer)", icon: <Headphones size={12} /> },
        ],
    },
];

export default function SkillsGrid() {
    return (
        <section
            id="skills"
            className="py-28 px-6 relative"
            style={{ borderTop: "1px solid var(--bb-border)", borderBottom: "1px solid var(--bb-border)" }}
        >
            {/* Section header */}
            <div className="max-w-7xl mx-auto mb-14">
                <p
                    className="text-xs tracking-[0.35em] uppercase mb-3"
                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.3em" }}
                >
                    <Cpu size={12} className="inline mr-2" />
                    ESTADÍSTICAS DEL CAZADOR
                </p>
                <h2
                    className="text-4xl md:text-5xl mb-4"
                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)" }}
                >
                    Arsenal{" "}
                    <span style={{ color: "var(--bb-white)" }}>Tecnológico</span>
                </h2>
                <div className="bb-separator" style={{ maxWidth: "400px" }} />
                <p
                    className="mt-4 text-lg max-w-2xl"
                    style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                >
                    Stack integral: desde interfaces web y apps móviles hasta análisis de datos, soporte técnico de hardware y desarrollo de videojuegos.
                </p>
            </div>

            {/* Category grid – 2 cols on md, 4 cols on xl */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-5">
                {SKILL_CATEGORIES.map((category, idx) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bb-corner-box"
                        style={{
                            background: "var(--bb-panel)",
                            border: "1px solid var(--bb-border)",
                            padding: "1.75rem",
                        }}
                    >
                        <span className="bb-corner-tr" />
                        <span className="bb-corner-bl" />

                        {/* Category header */}
                        <div className="mb-1">
                            <p
                                className="text-[0.58rem] tracking-[0.28em] uppercase mb-2 flex items-center gap-1.5"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)" }}
                            >
                                {category.icon} {category.label}
                            </p>
                            <h3
                                className="text-sm leading-snug"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.06em" }}
                            >
                                {category.title}
                            </h3>
                        </div>

                        <div className="bb-separator mt-3 mb-4" />

                        {/* Skill rows */}
                        <div>
                            {category.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="bb-stat-row"
                                    onMouseEnter={() => {
                                        import("@/lib/sounds").then(({ playHoverLight }) => playHoverLight());
                                    }}
                                >
                                    <span
                                        className="w-5 flex-shrink-0 flex justify-center text-sm"
                                        style={{ color: "var(--bb-muted)" }}
                                    >
                                        {skill.icon}
                                    </span>
                                    <span className="bb-stat-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
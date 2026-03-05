"use client";
import { playHoverLight } from "@/lib/sounds";

import { motion } from "framer-motion";
import { Cpu, Globe, Database, Wrench, Network, FileSpreadsheet } from "lucide-react";
import {
    FaReact, FaPython, FaDocker, FaNodeJs, FaGitAlt,
    FaHtml5, FaCss3Alt, FaJs, FaJava, FaGithub, FaCode, FaFileExcel
} from "react-icons/fa";
import {
    SiNextdotjs, SiFastapi, SiSupabase, SiTypescript, SiTailwindcss,
    SiPostgresql, SiTampermonkey, SiArduino, SiExpo, SiFlutter,
    SiGodotengine, SiC, SiSqlite, SiAdobephotoshop, SiOpenai
} from "react-icons/si";

const SKILL_CATEGORIES = [
    {
        title: "Frontend & Mobile",
        label: "DISCIPLINA I",
        icon: <Globe size={14} />,
        skills: [
            { name: "React 19 / Web", icon: <FaReact /> },
            { name: "Next.js 15", icon: <SiNextdotjs /> },
            { name: "TypeScript", icon: <SiTypescript /> },
            { name: "JavaScript Vanilla", icon: <FaJs /> },
            { name: "HTML5 & CSS3", icon: <span className="flex gap-1"><FaHtml5 /><FaCss3Alt /></span> },
            { name: "React Native", icon: <FaReact /> },
            { name: "Expo Go", icon: <SiExpo /> },
            { name: "Flutter", icon: <SiFlutter /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        ],
    },
    {
        title: "Backend, Data & Core",
        label: "DISCIPLINA II",
        icon: <Database size={14} />,
        skills: [
            { name: "Python 3.12", icon: <FaPython /> },
            { name: "Node.js", icon: <FaNodeJs /> },
            { name: "Java", icon: <FaJava /> },
            { name: "C Language", icon: <SiC /> },
            { name: "Lisp", icon: <FaCode /> },
            { name: "FastAPI", icon: <SiFastapi /> },
            { name: "SQL & SQLite", icon: <SiSqlite /> },
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "Supabase", icon: <SiSupabase /> },
            { name: "API Integrations", icon: <Network size={14} /> },
        ],
    },
    {
        title: "Tools, AI & Design",
        label: "DISCIPLINA III",
        icon: <Wrench size={14} />,
        skills: [
            { name: "Git & GitHub", icon: <span className="flex gap-1"><FaGitAlt /><FaGithub /></span> },
            { name: "Docker", icon: <FaDocker /> },
            { name: "Godot Engine", icon: <SiGodotengine /> },
            { name: "AI Prompting/Dev", icon: <SiOpenai /> },
            { name: "AppSheet (No-Code)", icon: <FileSpreadsheet size={14} /> },
            { name: "Excel / Sheets", icon: <FaFileExcel /> },
            { name: "Photoshop", icon: <SiAdobephotoshop /> },
            { name: "Violentmonkey", icon: <SiTampermonkey /> },
            { name: "Arduino / IoT", icon: <SiArduino /> },
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
                    ESTADÍSTICAS
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
                    Stack híbrido y expansivo: desde desarrollo web y móvil hasta bajo nivel y automatización con IA.
                </p>
            </div>

            {/* Category grid */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
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
                                className="text-[0.6rem] tracking-[0.3em] uppercase mb-2"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.25em" }}
                            >
                                {category.icon} &nbsp; {category.label}
                            </p>
                            <h3
                                className="text-base"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.08em" }}
                            >
                                {category.title}
                            </h3>
                        </div>

                        <div className="bb-separator mt-3 mb-4" />

                        {/* Skill rows */}
                        <div>
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="bb-stat-row" onMouseEnter={() => playHoverLight()}>
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
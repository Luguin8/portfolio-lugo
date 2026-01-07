"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Database, Wrench, Network, FileSpreadsheet } from "lucide-react";
// 1. Agregamos FaFileExcel aquí
import {
    FaReact, FaPython, FaDocker, FaNodeJs, FaGitAlt,
    FaHtml5, FaCss3Alt, FaJs, FaJava, FaGithub, FaCode, FaFileExcel
} from "react-icons/fa";
// 2. Eliminamos SiMicrosoftexcel de aquí
import {
    SiNextdotjs, SiFastapi, SiSupabase, SiTypescript, SiTailwindcss,
    SiPostgresql, SiTampermonkey, SiArduino, SiExpo, SiFlutter,
    SiGodotengine, SiC, SiSqlite, SiAdobephotoshop, SiOpenai
} from "react-icons/si";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
    {
        title: "Frontend & Mobile",
        icon: <Globe className="text-blue-400" />,
        skills: [
            { name: "React 19 / Web", icon: <FaReact className="text-[#61DAFB]" /> },
            { name: "Next.js 15", icon: <SiNextdotjs className="text-white" /> },
            { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
            { name: "JavaScript Vanilla", icon: <FaJs className="text-[#F7DF1E]" /> },
            { name: "HTML5 & CSS3", icon: <div className="flex gap-1"><FaHtml5 className="text-[#E34F26]" /><FaCss3Alt className="text-[#1572B6]" /></div> },
            { name: "React Native", icon: <FaReact className="text-[#61DAFB]" /> },
            { name: "Expo Go", icon: <SiExpo className="text-white" /> },
            { name: "Flutter", icon: <SiFlutter className="text-[#02569B]" /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
        ]
    },
    {
        title: "Backend, Data & Core",
        icon: <Database className="text-green-400" />,
        skills: [
            { name: "Python 3.12", icon: <FaPython className="text-[#3776AB]" /> },
            { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
            { name: "Java", icon: <FaJava className="text-[#007396]" /> },
            { name: "C Language", icon: <SiC className="text-[#A8B9CC]" /> },
            { name: "Lisp", icon: <FaCode className="text-gray-300" /> },
            { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
            { name: "SQL & SQLite", icon: <SiSqlite className="text-[#003B57]" /> },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
            { name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
            { name: "API Integrations", icon: <Network size={18} className="text-pink-400" /> },
        ]
    },
    {
        title: "Tools, AI & Design",
        icon: <Wrench className="text-purple-400" />,
        skills: [
            { name: "Git & GitHub", icon: <div className="flex gap-1"><FaGitAlt className="text-[#F05032]" /><FaGithub className="text-white" /></div> },
            { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
            { name: "Godot Engine", icon: <SiGodotengine className="text-[#478CBF]" /> },
            { name: "AI Prompting/Dev", icon: <SiOpenai className="text-[#412991]" /> },
            { name: "AppSheet (No-Code)", icon: <FileSpreadsheet className="text-white" /> },
            { name: "Excel / Sheets", icon: <FaFileExcel className="text-[#217346]" /> }, // CORREGIDO: Usamos FaFileExcel
            { name: "Photoshop", icon: <SiAdobephotoshop className="text-[#31A8FF]" /> },
            { name: "Violentmonkey", icon: <SiTampermonkey className="text-[#004d40]" /> },
            { name: "Arduino / IoT", icon: <SiArduino className="text-[#00979D]" /> },
        ]
    }
];

export default function SkillsGrid() {
    const { isDevMode } = useDevMode();

    return (
        <section id="skills" className="py-32 px-6 relative bg-[#151515]/50 border-y border-white/5">
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center gap-2 text-primary font-mono text-sm mb-4">
                    <Cpu size={16} />
                    <span>~/skills</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Arsenal <span className="text-gray-500">Tecnológico</span>
                </h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Stack híbrido y expansivo: Desde desarrollo web y móvil hasta bajo nivel y automatización con IA.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                {SKILL_CATEGORIES.map((category, idx) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                            "bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-colors group relative overflow-hidden",
                            isDevMode && "hover:bg-transparent cursor-crosshair border-dashed"
                        )}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-white/5">
                                    <span className="text-xl w-6 flex justify-center">{skill.icon}</span>
                                    <span className="text-sm font-mono">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
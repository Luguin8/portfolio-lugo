"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Layout, Server, Wrench } from "lucide-react";
import { FaReact, FaPython, FaDocker, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiFastapi, SiSupabase, SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiRedis, SiLinux, SiFigma } from "react-icons/si";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
    {
        title: "Frontend Architecture",
        icon: <Layout className="text-blue-400" />,
        skills: [
            { name: "React 19", icon: <FaReact className="text-[#61DAFB]" /> },
            { name: "Next.js 15", icon: <SiNextdotjs className="text-white" /> },
            { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
            { name: "Framer Motion", icon: <div className="font-bold text-white">FM</div> }, // Icono texto si no hay logo
        ]
    },
    {
        title: "Backend & Systems",
        icon: <Server className="text-green-400" />,
        skills: [
            { name: "Python 3.12", icon: <FaPython className="text-[#3776AB]" /> },
            { name: "FastAPI", icon: <SiFastapi className="text-[#009688]" /> },
            { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
            { name: "Supabase", icon: <SiSupabase className="text-[#3ECF8E]" /> },
            { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
        ]
    },
    {
        title: "DevOps & Tools",
        icon: <Wrench className="text-purple-400" />,
        skills: [
            { name: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
            { name: "Git / GitHub", icon: <FaGitAlt className="text-[#F05032]" /> },
            { name: "Linux / Bash", icon: <SiLinux className="text-white" /> },
            { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
            { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
        ]
    }
];

export default function SkillsGrid() {
    const { isDevMode } = useDevMode();

    return (
        <section id="skills" className="py-32 px-6 relative bg-[#151515]/50 border-y border-white/5">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center gap-2 text-primary font-mono text-sm mb-4">
                    <Cpu size={16} />
                    <span>~/skills</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Arsenal <span className="text-gray-500">Tecnológico</span>
                </h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Stack moderno enfocado en rendimiento, escalabilidad y experiencia de usuario.
                </p>
            </div>

            {/* GRID CATEGORÍAS */}
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
                        {/* Dev Mode Label */}
                        {isDevMode && (
                            <div className="absolute top-2 right-2 text-[10px] font-mono text-gray-600">
                                Array_ID: {idx}
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/50 transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {category.skills.map((skill) => (
                                <div key={skill.name} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-white/5">
                                    <span className="text-xl">{skill.icon}</span>
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
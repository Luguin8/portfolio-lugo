"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
// Importamos los iconos correctos: LinkedIn y Envelope (Email)
import { FaReact, FaPython, FaDocker, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiNextdotjs, SiFastapi, SiSupabase, SiTypescript, SiPostgresql, SiGodotengine } from "react-icons/si";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ORBITS = [
    { radius: 180, duration: 30, icons: [<FaReact key="react" />, <SiNextdotjs key="next" />, <SiTypescript key="ts" />], reverse: false },
    { radius: 280, duration: 45, icons: [<FaPython key="py" />, <SiFastapi key="fast" />, <SiPostgresql key="pg" />], reverse: true },
    { radius: 380, duration: 60, icons: [<FaDocker key="docker" />, <SiSupabase key="supa" />, <SiGodotengine key="godot" />], reverse: false },
];

export default function Hero() {
    const { isDevMode } = useDevMode();

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">

            {/* FONDO GRID */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/50 to-[#121212] pointer-events-none" />

            {/* SISTEMA DE ÓRBITAS */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden lg:flex select-none opacity-40 hover:opacity-100 transition-opacity duration-700">
                {ORBITS.map((orbit, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-white/5"
                        style={{
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                            animation: `spin ${orbit.duration}s linear infinite ${orbit.reverse ? 'reverse' : ''}`
                        }}
                    >
                        {orbit.icons.map((icon, j) => {
                            const angle = (360 / orbit.icons.length) * j;
                            return (
                                <div
                                    key={j}
                                    className="absolute text-gray-500 hover:text-primary transition-colors transform hover:scale-150"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        width: 40,
                                        height: 40,
                                        marginLeft: -20,
                                        marginTop: -20,
                                        transform: `rotate(${angle}deg) translate(${orbit.radius}px) rotate(-${angle}deg) rotate(-${isDevMode ? 0 : 0}deg)`,
                                    }}
                                >
                                    <div className="animate-[spin_10s_linear_infinite_reverse] text-2xl">
                                        {icon}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                {/* TEXTO */}
                <div className="space-y-8 text-center lg:text-left">
                    <div className="space-y-2">
                        <p className="font-mono text-primary text-sm tracking-widest animate-pulse">
                            &gt; INITIALIZING SYSTEM...
                        </p>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                            Lugo Martin
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-400 font-light">
                            Full Stack <span className="text-white font-medium">Developer</span>
                        </h2>
                        <p className="text-gray-500 max-w-lg text-lg leading-relaxed pt-2 mx-auto lg:mx-0">
                            Transformando ideas complejas en código limpio y escalable.
                            <span className="block mt-1 font-mono text-sm text-primary">
                                Python, React, Next.js, React Native, Node.js, JS Vanilla
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(102,71,169,0.3)] hover:shadow-[0_0_30px_rgba(102,71,169,0.5)] flex items-center gap-2 group"
                        >
                            Explorar Trabajo
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="/CV - Lugo Martin Adrian.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                            <FileText size={18} />
                            Resume / CV
                        </a>
                    </div>

                    <div className="flex items-center gap-6 text-gray-400 pt-4 justify-center lg:justify-start">
                        {/* ICONOS CORREGIDOS: Grises por defecto, blancos/primary al hover */}
                        <SocialLink href="https://github.com/Luquin8" icon={<FaGithub size={24} />} />
                        <SocialLink href="https://linkedin.com/in/lugoamartin" icon={<FaLinkedin size={24} />} />
                        <SocialLink href="mailto:lugoamartin@gmail.com" icon={<FaEnvelope size={24} />} />
                    </div>
                </div>

                {/* FOTO */}
                <div className={cn("relative group mx-auto", isDevMode && "dev-border")}>
                    {isDevMode && (
                        // CORRECCIÓN: Cartel movido abajo para no tapar la cara
                        <div className="absolute -bottom-12 left-0 right-0 mx-auto w-max bg-black/80 border border-primary/50 text-primary text-[10px] font-mono p-2 rounded">
                            <div>Detected: OrbitSystem.tsx</div>
                            <div>Animations: CSS Keyframes | Z-Index: 10</div>
                        </div>
                    )}

                    <div className="relative w-64 h-64 md:w-96 md:h-96 grayscale hover:grayscale-0 transition-all duration-500 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-primary/50 z-20 bg-[#1a1a1a]">
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 font-mono bg-[#1a1a1a]">
                            <span className="text-4xl mb-2">📸</span>
                            <Image
                                src="/profile.png" // Asegúrate que el nombre coincida con tu archivo en /public
                                alt="Lugo Martin"
                                fill
                                className="object-cover"
                                priority // Carga prioritaria para el Hero (LCP)
                            />
                        </div>

                        {/* Overlay Glitch */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
                    </div>

                    <div className="absolute -inset-4 border border-primary/20 rounded-2xl -z-10 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
                </div>

            </div>
        </section>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform">
            {icon}
        </a>
    );
}
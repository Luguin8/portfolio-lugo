"use client";

import { motion } from "framer-motion";
import { FileText, Gamepad2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { playNavigate, playSelect } from "@/lib/sounds";
import Magnetic from "@/components/ui/Magnetic";
import OrnateFrame from "@/components/ui/OrnateFrame";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
        >
            {/* Gradient overlay (atmospheric depth) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 80% 65% at 50% 35%, rgba(80,55,15,0.12) 0%, transparent 72%)"
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* ── LEFT: TEXT ── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8 text-center lg:text-left"
                >
                    {/* Eyebrow */}
                    <p className="text-xs tracking-[0.35em] uppercase font-title text-bb-gold">
                        ✦ &nbsp; Full Stack · Mobile · Data · Automatización &nbsp; ✦
                    </p>

                    {/* Main title */}
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight font-title text-bb-gold tracking-[0.06em] bb-glow-text">
                            Lugo
                            <br />
                            <span className="text-bb-white" style={{ textShadow: "none" }}>Martin</span>
                        </h1>

                        <div className="bb-separator mt-4 mb-4" style={{ maxWidth: "320px" }} />

                        <h2 className="text-xl md:text-2xl font-normal font-body italic text-bb-muted">
                            Llevo tu idea de negocio a producción, de punta a punta
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-body text-bb-muted">
                        Trabajo directo con founders y equipos técnicos: interfaces web y mobile,
                        backends escalables y automatizaciones que ahorran horas de trabajo manual.
                        Sin intermediarios, con comunicación directa y entregas medibles.
                        <br />
                        <span className="text-[0.72rem] tracking-[0.12em] not-italic mt-1 block font-title text-bb-gold">
                            Vue · Nuxt · React · Next.js · NestJS · GraphQL · Turborepo · Python · Docker
                        </span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <Magnetic strength={0.3}>
                            <a
                                href="#projects"
                                className="bb-btn"
                                onMouseEnter={() => playNavigate()}
                                onClick={() => playSelect()}
                            >
                                Ver Trabajos
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.3}>
                            <a
                                href="/CV - Lugo Martin Adrian.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bb-btn-secondary flex items-center gap-2"
                                onMouseEnter={() => playNavigate()}
                                onClick={() => playSelect()}
                            >
                                <FileText size={14} />
                                Resume / CV
                            </a>
                        </Magnetic>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                        <SocialLink href="https://github.com/Luguin8" icon={<FaGithub size={20} />} label="GitHub" />
                        <SocialLink href="https://linkedin.com/in/lugoamartin" icon={<FaLinkedin size={20} />} label="LinkedIn" />
                        <SocialLink href="mailto:lugoamartin@gmail.com" icon={<FaEnvelope size={20} />} label="Email" />
                    </div>
                </motion.div>

                {/* ── RIGHT: PHOTO ── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                    className="relative mx-auto flex flex-col items-center justify-center gap-6"
                >
                    {/* Retro experience button — links to the PS2-style /psxemu portfolio */}
                    <Link
                        href="/psxemu"
                        className="group w-64 md:w-80 bb-corner-box relative z-20 block"
                        style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                        onMouseEnter={() => playNavigate()}
                        onClick={() => playSelect()}
                    >
                        <span className="bb-corner-tr" />
                        <span className="bb-corner-bl" />
                        <div className="px-5 py-4 flex flex-col items-center justify-center gap-1">
                            <div className="flex items-center gap-3">
                                <Gamepad2 size={16} className="text-bb-gold shrink-0" />
                                <span className="text-[0.6rem] tracking-[0.25em] uppercase font-title text-bb-gold group-hover:text-bb-white transition-colors duration-200">
                                    Experiencia Retro
                                </span>
                            </div>
                            <span className="text-[0.5rem] tracking-[0.1em] font-body italic text-bb-muted">
                                (se recomienda ver en PC de escritorio)
                            </span>
                        </div>
                    </Link>

                    {/* Photo frame with BB corner accents — links to Instagram */}
                    <a
                        href="https://www.instagram.com/lugomartn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bb-corner-box relative group block"
                        title="@lugomartn en Instagram"
                        onMouseEnter={() => playNavigate()}
                        onClick={() => playSelect()}
                    >
                        <span className="bb-corner-tr" />
                        <span className="bb-corner-bl" />
                        <OrnateFrame />

                        {/* Outer atmospheric ring – pulsing glow */}
                        <div
                            className="absolute -inset-8 pointer-events-none bb-photo-glow"
                            style={{
                                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(212,174,82,0.10) 0%, transparent 68%)"
                            }}
                        />

                        {/* Photo */}
                        <div
                            className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden"
                            style={{ border: "1px solid var(--bb-border)" }}
                        >
                            <Image
                                src="/profile.png"
                                alt="Lugo Martin"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Hover golden tint */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: "rgba(201,168,76,0.08)", mixBlendMode: "overlay" }}
                            />
                        </div>

                        {/* Bottom label plate */}
                        <div
                            className="absolute left-0 right-0 bottom-0 py-2 text-center"
                            style={{
                                background: "rgba(5,4,3,0.80)",
                                borderTop: "1px solid var(--bb-border)",
                                backdropFilter: "blur(4px)"
                            }}
                        >
                            <span className="text-xs tracking-[0.2em] uppercase font-title text-bb-gold group-hover:hidden">
                                Full Stack Dev
                            </span>
                            <span className="text-xs tracking-[0.2em] uppercase font-title text-bb-gold hidden group-hover:inline">
                                @lugomartn
                            </span>
                        </div>
                    </a>
                </motion.div>

            </div>

            {/* Bottom separator */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="bb-separator" />
            </div>
        </section>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            className="transition-colors duration-200 text-bb-muted hover:text-bb-gold"
            onMouseEnter={() => playNavigate()}
            onClick={() => playSelect()}
        >
            {icon}
        </a>
    );
}
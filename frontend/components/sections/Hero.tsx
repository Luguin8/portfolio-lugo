"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { playNavigate, playSelect } from "@/lib/sounds";

export default function Hero() {
    const { isDevMode } = useDevMode();

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
        >
            {/* Gradient overlay (atmospheric depth) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(60,40,10,0.08) 0%, transparent 70%)"
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
                    <p
                        className="text-xs tracking-[0.35em] uppercase"
                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.35em" }}
                    >
                        ✦ &nbsp; Portafolio · Full Stack &nbsp; ✦
                    </p>

                    {/* Main title */}
                    <div className="space-y-2">
                        <h1
                            className="text-5xl md:text-7xl font-bold leading-tight"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.06em" }}
                        >
                            Lugo
                            <br />
                            <span style={{ color: "var(--bb-white)" }}>Martin</span>
                        </h1>

                        <div className="bb-separator mt-4 mb-4" style={{ maxWidth: "320px" }} />

                        <h2
                            className="text-xl md:text-2xl font-normal"
                            style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                        >
                            Full Stack Developer & Architect
                        </h2>
                    </div>

                    {/* Description */}
                    <p
                        className="text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
                        style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)" }}
                    >
                        Transformando ideas complejas en código limpio y escalable.
                        <br />
                        <span
                            className="text-sm tracking-wider not-italic mt-1 block"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.12em", fontSize: "0.72rem" }}
                        >
                            Python · React · Next.js · Node.js · FastAPI · Docker
                        </span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <a
                            href="#projects"
                            className="bb-btn"
                            onMouseEnter={() => playNavigate()}
                            onClick={() => playSelect()}
                        >
                            Explorar Obras
                        </a>
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
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-6 justify-center lg:justify-start pt-2">
                        <SocialLink href="https://github.com/Luquin8" icon={<FaGithub size={20} />} label="GitHub" />
                        <SocialLink href="https://linkedin.com/in/lugoamartin" icon={<FaLinkedin size={20} />} label="LinkedIn" />
                        <SocialLink href="mailto:lugoamartin@gmail.com" icon={<FaEnvelope size={20} />} label="Email" />
                    </div>
                </motion.div>

                {/* ── RIGHT: PHOTO ── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                    className={cn("relative mx-auto flex items-center justify-center", isDevMode && "outline outline-1 outline-dashed outline-yellow-400/30")}
                >
                    {/* Dev mode label */}
                    {isDevMode && (
                        <div
                            className="absolute -bottom-8 left-0 right-0 w-max mx-auto text-[10px] px-2 py-1 border"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", borderColor: "var(--bb-border)", background: "var(--bb-panel)", letterSpacing: "0.12em" }}
                        >
                            Hero.tsx · ProfileFrame
                        </div>
                    )}

                    {/* Photo frame with BB corner accents */}
                    <div className="bb-corner-box relative group">
                        <span className="bb-corner-tr" />
                        <span className="bb-corner-bl" />

                        {/* Outer atmospheric ring */}
                        <div
                            className="absolute -inset-6 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)"
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
                            <span
                                className="text-xs tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.2em" }}
                            >
                                Full Stack Dev
                            </span>
                        </div>
                    </div>
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
            className="transition-colors duration-200"
            style={{ color: "var(--bb-muted)" }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)";
                playNavigate();
            }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)"; }}
            onClick={() => playSelect()}
        >
            {icon}
        </a>
    );
}
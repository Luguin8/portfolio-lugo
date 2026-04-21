"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Download } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";
import { playNavigate, playOpen } from "@/lib/sounds";

export interface Project {
    id: number;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    demo_link?: string;
    repo_link?: string;
    download_link?: string;
    project_type: 'web' | 'mobile' | 'desktop' | 'game' | string;
}

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const { isDevMode } = useDevMode();
    const isMobileLayout = project.project_type === 'mobile';
    const mainImage = project.images[0];

    return (
        <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            scale={1.02}
            transitionSpeed={2000}
            className="h-full"
            glareEnable={true}
            glareMaxOpacity={0.15}
            glareColor="#c9a84c"
            glarePosition="all"
            glareBorderRadius="0px"
        >
            <motion.div
                className={cn(
                    "relative group flex flex-col cursor-pointer h-full bb-corner-box",
                    isDevMode && "outline outline-dashed outline-1 outline-yellow-400/30"
                )}
            style={{
                background: "var(--bb-panel)",
                border: "1px solid var(--bb-border)",
                transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-gold)";
                playNavigate();
            }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-border)"; }}
            onClick={() => { playOpen(); onClick(); }}
        >
            {/* BB corner accents rendered via CSS class – extras via spans */}
            <span className="bb-corner-tr" />
            <span className="bb-corner-bl" />

            {/* Dev mode badge */}
            {isDevMode && (
                <div
                    className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
                    style={{ background: "rgba(5,4,3,0.5)" }}
                >
                    <div
                        className="text-[10px] border px-2"
                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", borderColor: "var(--bb-border)", letterSpacing: "0.1em" }}
                    >
                        ProjectCard · id={project.id}
                    </div>
                </div>
            )}

            {/* Expand hint (top right) */}
            <div
                className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 border"
                style={{ background: "rgba(5,4,3,0.85)", borderColor: "var(--bb-border)", color: "var(--bb-gold)" }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M15 3h6m0 0v6m0-6-7 7M9 21H3m0 0v-6m0 6 7-7" />
                </svg>
            </div>

            {/* CONTENT */}
            <div className={cn("p-5 flex-1 transition-opacity duration-300", isDevMode && "group-hover:opacity-20")}>
                {!isMobileLayout ? (
                    /* WEB / DESKTOP layout */
                    <div className="flex flex-col h-full">
                        {/* Image */}
                        <div
                            className="relative w-full aspect-video mb-5 overflow-hidden shrink-0 group/image"
                            style={{ border: "1px solid var(--bb-border-dim)", background: "#000" }}
                        >
                            <Image
                                src={mainImage}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                            />
                            <div
                                className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 border"
                                style={{
                                    background: "rgba(5,4,3,0.80)",
                                    borderColor: "var(--bb-border-dim)",
                                    fontFamily: "var(--font-title)",
                                    color: "var(--bb-muted)",
                                    letterSpacing: "0.12em",
                                }}
                            >
                                +{project.images.length - 1} IMGS
                            </div>
                            
                            {/* Hover Actions over Image */}
                            {(project.demo_link || project.download_link || project.repo_link) && (
                                <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-bb-panel/80 backdrop-blur-[2px]">
                                    {project.demo_link && (
                                        <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="bb-btn bg-bb-bg w-40 text-xs py-1.5" onClick={(e) => e.stopPropagation()}>
                                            <ExternalLink size={12} /> Visitar Web
                                        </a>
                                    )}
                                    {project.download_link && (
                                        <a href={project.download_link} target="_blank" rel="noopener noreferrer" className="bb-btn bg-bb-bg w-40 text-xs py-1.5 border-bb-gold text-bb-gold hover:bg-bb-gold hover:text-bb-bg" onClick={(e) => e.stopPropagation()} download>
                                            <Download size={12} /> Descargar App
                                        </a>
                                    )}
                                    {project.repo_link && (
                                        <a href={project.repo_link} target="_blank" rel="noopener noreferrer" className="bb-btn-secondary bg-bb-bg w-40 text-xs py-1.5" onClick={(e) => e.stopPropagation()}>
                                            <Github size={12} /> Repositorio
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col flex-1">
                            <h3
                                className="text-xl mb-1 transition-colors duration-200 group-hover:text-[var(--bb-gold-bright)]"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.05em" }}
                            >
                                {project.title}
                            </h3>
                            <div className="bb-separator mb-3" />
                            <p
                                className="text-sm leading-relaxed line-clamp-3 mb-4"
                                style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)" }}
                            >
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.slice(0, 4).map(tag => (
                                    <span key={tag} className="bb-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* MOBILE layout */
                    <div className="flex gap-5 h-full">
                        {/* Phone mockup */}
                        <div
                            className="relative w-32 shrink-0 aspect-[9/19] overflow-hidden"
                            style={{ border: "1px solid var(--bb-border)", background: "#000" }}
                        >
                            <Image src={mainImage} alt={project.title} fill className="object-cover" />
                            <div
                                className="absolute bottom-0 left-0 right-0 p-2 text-center text-[10px]"
                                style={{
                                    background: "linear-gradient(to top, rgba(5,4,3,0.9), transparent)",
                                    fontFamily: "var(--font-title)",
                                    color: "var(--bb-muted)",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                +{project.images.length}
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 justify-between py-1">
                            <div>
                                <h3
                                    className="text-lg mb-1 transition-colors duration-200 group-hover:text-[var(--bb-gold-bright)]"
                                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.05em" }}
                                >
                                    {project.title}
                                </h3>
                                <div className="bb-separator mb-3" />
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {project.tags.slice(0, 5).map(tag => (
                                        <span key={tag} className="bb-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <p
                                className="text-xs leading-relaxed line-clamp-4 mb-3"
                                style={{ fontFamily: "var(--font-body)", color: "var(--bb-muted)" }}
                            >
                                {project.description}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mt-auto opacity-60 group-hover:opacity-100 transition-opacity relative z-20">
                                {project.demo_link ? (
                                    <a
                                        href={project.demo_link} target="_blank" rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="py-1.5 text-[10px] flex items-center justify-center gap-1.5 border border-bb-border text-bb-muted hover:border-bb-gold hover:text-bb-gold font-title tracking-[0.1em] transition-colors"
                                    >
                                        <ExternalLink size={10} /> INFO
                                    </a>
                                ) : project.download_link ? (
                                    <a
                                        href={project.download_link} target="_blank" rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()} download
                                        className="py-1.5 text-[10px] flex items-center justify-center gap-1.5 border border-bb-border text-bb-muted hover:border-bb-gold hover:text-bb-gold font-title tracking-[0.1em] transition-colors"
                                    >
                                        <Download size={10} /> APK
                                    </a>
                                ) : (
                                    <div className="py-1.5 text-[10px] flex items-center justify-center gap-1.5 border border-bb-border text-bb-muted font-title tracking-[0.1em] opacity-50">
                                        <ExternalLink size={10} /> INFO
                                    </div>
                                )}
                                
                                {project.repo_link ? (
                                    <a
                                        href={project.repo_link} target="_blank" rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="py-1.5 text-[10px] flex items-center justify-center gap-1.5 border border-bb-border text-bb-muted hover:border-bb-gold hover:text-bb-gold font-title tracking-[0.1em] transition-colors"
                                    >
                                        <Github size={10} /> CODE
                                    </a>
                                ) : (
                                    <div className="py-1.5 text-[10px] flex items-center justify-center gap-1.5 border border-bb-border text-bb-muted font-title tracking-[0.1em] opacity-50">
                                        <Github size={10} /> CODE
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            </motion.div>
        </Tilt>
    );
}
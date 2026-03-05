"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Smartphone, Monitor, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "./ProjectCard";

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const isWeb = project.project_type === 'web';

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{ background: "rgba(2,1,0,0.93)", backdropFilter: "blur(6px)" }}
                onClick={onClose}
            />

            {/* Modal panel */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bb-corner-box relative w-full max-w-6xl h-[90vh] flex flex-col md:flex-row z-[101] overflow-hidden"
                style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Corner accents */}
                <span className="bb-corner-tr" />
                <span className="bb-corner-bl" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 transition-colors duration-200"
                    style={{ color: "var(--bb-muted)", border: "1px solid var(--bb-border)", background: "rgba(5,4,3,0.80)" }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-gold)";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-border)";
                    }}
                >
                    <X size={18} />
                </button>

                {/* ── LEFT: GALLERY ── */}
                <div
                    className="flex-1 relative flex items-center justify-center overflow-hidden group/gallery"
                    style={{ background: "#000", borderRight: "1px solid var(--bb-border)" }}
                >
                    <div className="relative w-full h-full p-4 md:p-8 flex items-center justify-center">
                        <div className="relative w-full h-full max-h-[80vh]">
                            <Image
                                key={currentImgIndex}
                                src={project.images[currentImgIndex]}
                                alt={`Screenshot ${currentImgIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Gallery nav */}
                    {project.images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 transition-all opacity-0 group-hover/gallery:opacity-100 border"
                                style={{ background: "rgba(5,4,3,0.80)", borderColor: "var(--bb-border)", color: "var(--bb-muted)" }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-gold)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-border)";
                                }}
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-all opacity-0 group-hover/gallery:opacity-100 border"
                                style={{ background: "rgba(5,4,3,0.80)", borderColor: "var(--bb-border)", color: "var(--bb-muted)" }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-gold)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)";
                                    (e.currentTarget as HTMLElement).style.borderColor = "var(--bb-border)";
                                }}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </>
                    )}

                    {/* Pagination dashes */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                        {project.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImgIndex(idx)}
                                className="text-lg leading-none transition-colors duration-200"
                                style={{ color: idx === currentImgIndex ? "var(--bb-gold)" : "var(--bb-border)" }}
                                title={`Image ${idx + 1}`}
                            >
                                —
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: INFO PANEL (Bloodborne lore panel) ── */}
                <div
                    className="w-full md:w-[400px] flex flex-col h-full overflow-y-auto"
                    style={{ background: "var(--bb-panel-light)" }}
                >
                    {/* Header region */}
                    <div className="p-8 pb-0 shrink-0">
                        {/* Type badge */}
                        <p
                            className="text-[0.6rem] tracking-[0.3em] uppercase mb-2 flex items-center gap-2"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.28em" }}
                        >
                            {isWeb ? <Monitor size={11} /> : <Smartphone size={11} />}
                            {isWeb ? "APLICACIÓN WEB" : "APLICACIÓN MÓVIL"}
                        </p>

                        {/* Title */}
                        <h2
                            className="text-2xl mb-2 leading-tight"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.06em" }}
                        >
                            {project.title}
                        </h2>

                        {/* Ornate separator */}
                        <div className="relative my-4">
                            <div className="bb-separator bb-separator-ornate" />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="bb-tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Second separator */}
                    <div className="px-8 shrink-0">
                        <div className="bb-separator" />
                    </div>

                    {/* Lore / Description text */}
                    <div className="flex-1 px-8 py-5 overflow-y-auto">
                        <p
                            className="text-base leading-[1.9] text-justify whitespace-pre-line"
                            style={{ fontFamily: "var(--font-body)", color: "var(--bb-white)", fontSize: "1.05rem" }}
                        >
                            {project.description}
                        </p>
                    </div>

                    {/* Footer separator + actions */}
                    <div className="shrink-0 px-8 pb-8">
                        <div className="bb-separator mb-6" />
                        <div className="space-y-3">
                            {project.demo_link && (
                                <a
                                    href={project.demo_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bb-btn w-full"
                                >
                                    <ExternalLink size={14} />
                                    Ver Demo Live
                                </a>
                            )}
                            {project.repo_link && (
                                <a
                                    href={project.repo_link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bb-btn-secondary w-full"
                                >
                                    <Github size={14} />
                                    Ver Código
                                </a>
                            )}
                        </div>

                        {/* Bottom status line */}
                        <div className="bb-separator mt-6 mb-3" />
                        <p
                            className="text-[0.6rem] tracking-widest text-center"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)", letterSpacing: "0.2em" }}
                        >
                            PRESIONA ESC O HAZ CLIC FUERA PARA CERRAR
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
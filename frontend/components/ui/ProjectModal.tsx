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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />

            <motion.div
                // BORRADO: layoutId, ahora usamos animación manual
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl h-[90vh] bg-[#151515] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row z-[101]"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10">
                    <X size={24} />
                </button>

                {/* COLUMNA IZQUIERDA: GALERÍA */}
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden group/gallery">
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

                    {project.images.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-primary/80 text-white rounded-full transition-all opacity-0 group-hover/gallery:opacity-100 border border-white/10">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-primary/80 text-white rounded-full transition-all opacity-0 group-hover/gallery:opacity-100 border border-white/10">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                        {project.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImgIndex(idx)}
                                className={cn("w-2 h-2 rounded-full transition-all", idx === currentImgIndex ? "bg-primary w-4" : "bg-white/30 hover:bg-white/50")}
                            />
                        ))}
                    </div>
                </div>

                {/* COLUMNA DERECHA: INFO */}
                <div className="w-full md:w-[400px] bg-[#1a1a1a] border-l border-white/5 p-8 flex flex-col h-full overflow-y-auto">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs mb-2">
                            {isWeb ? <Monitor size={14} /> : <Smartphone size={14} />}
                            <span>{isWeb ? "Web Application" : "Mobile Application"}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{project.title}</h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-white/5 text-xs font-mono text-gray-300 rounded border border-white/5">{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 prose prose-invert prose-sm overflow-y-auto pr-2 custom-scrollbar">
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 space-y-3 shrink-0">
                        {project.demo_link && (
                            <a href={project.demo_link} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary/20">
                                <ExternalLink size={18} /> Ver Demo Live
                            </a>
                        )}
                        {project.repo_link && (
                            <a href={project.repo_link} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-medium transition-all">
                                <Github size={18} /> Ver Código
                            </a>
                        )}
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
}
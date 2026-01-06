"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Smartphone, Monitor, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

export interface Project {
    id: number;
    title: string;
    description: string;
    images: string[]; // <-- AHORA ES UN ARRAY
    tags: string[];
    demo_link?: string;
    repo_link?: string;
    project_type: 'web' | 'mobile';
}

export default function ProjectCard({ project }: { project: Project }) {
    const { isDevMode } = useDevMode();
    const [isOpen, setIsOpen] = useState(false);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const isWeb = project.project_type === 'web';
    const mainImage = project.images[0]; // La primera imagen es la portada

    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
    };

    return (
        <>
            {/* --- TARJETA (CARD VIEW) --- */}
            <motion.div
                layoutId={`card-${project.id}`}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "relative group rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 transition-all duration-500 h-full flex flex-col cursor-pointer hover:border-primary/50",
                    isDevMode && "hover:bg-transparent cursor-crosshair"
                )}
            >
                {/* CAPA OCULTA DEV MODE */}
                {isDevMode && (
                    <div className="absolute inset-0 -z-10 bg-black/50 flex items-center justify-center">
                        <div className="text-[10px] font-mono text-primary border border-primary px-2 bg-black">
                            &lt;Card id="{project.id}" images={project.images.length} /&gt;
                        </div>
                    </div>
                )}

                <div className={cn("p-5 flex-1 transition-opacity duration-300", isDevMode && "group-hover:opacity-10")}>

                    {/* Badge Click Hint */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/60 backdrop-blur text-white p-2 rounded-full border border-white/10">
                            <Maximize2 size={14} />
                        </div>
                    </div>

                    {isWeb ? (
                        // LAYOUT WEB
                        <div className="flex flex-col h-full">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-5 shrink-0 bg-black">
                                <Image src={mainImage} alt={project.title} fill className="object-cover" />
                                <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono border border-white/10">
                                    +{project.images.length - 1} imgs
                                </div>
                            </div>
                            <div className="flex flex-col flex-1">
                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mt-3 line-clamp-3 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tags.slice(0, 4).map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-gray-300 rounded border border-white/5">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        // LAYOUT MOBILE (El que te gustó)
                        <div className="flex gap-5 h-full">
                            <div className="relative w-36 shrink-0 aspect-[9/19] rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl">
                                <Image src={mainImage} alt={project.title} fill className="object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 flex justify-center">
                                    <span className="text-[10px] font-mono text-gray-400">+{project.images.length} caps</span>
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 h-auto min-h-full justify-between py-1">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight mb-2">{project.title}</h3>
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {project.tags.slice(0, 5).map(tag => (
                                            <span key={tag} className="text-[10px] font-mono text-gray-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-4 mb-3">{project.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* --- MODAL DE GALERÍA (FULLSCREEN) --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop Blur */}
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsOpen(false)} />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`card-${project.id}`}
                            className="relative w-full max-w-6xl h-[90vh] bg-[#151515] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Botón Cerrar */}
                            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/10 text-white rounded-full transition-colors">
                                <X size={24} />
                            </button>

                            {/* COLUMNA IZQUIERDA: GALERÍA */}
                            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden group/gallery">
                                <div className="relative w-full h-full p-4 md:p-12">
                                    <Image
                                        key={currentImgIndex}
                                        src={project.images[currentImgIndex]}
                                        alt={`Screenshot ${currentImgIndex + 1}`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>

                                {/* Flechas Carrusel */}
                                {project.images.length > 1 && (
                                    <>
                                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-primary/80 text-white rounded-full transition-all opacity-0 group-hover/gallery:opacity-100">
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-primary/80 text-white rounded-full transition-all opacity-0 group-hover/gallery:opacity-100">
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}

                                {/* Indicadores (Dots) */}
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

                            {/* COLUMNA DERECHA: INFO COMPLETA */}
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

                                <div className="flex-1 prose prose-invert prose-sm">
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                                        {project.description}
                                        {/* Aquí podrías agregar más texto largo si lo tuvieras en la DB */}
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                                    {project.demo_link && (
                                        <a href={project.demo_link} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-all">
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
                )}
            </AnimatePresence>
        </>
    );
}
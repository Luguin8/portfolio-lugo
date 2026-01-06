"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Maximize2 } from "lucide-react"; // Smartphone y Monitor borrados si no se usan, o dejalos
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

export interface Project {
    id: number;
    title: string;
    description: string;
    images: string[];
    tags: string[];
    demo_link?: string;
    repo_link?: string;
    project_type: 'web' | 'mobile';
}

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const { isDevMode } = useDevMode();
    const isWeb = project.project_type === 'web';
    const mainImage = project.images[0];

    return (
        <motion.div
            // BORRADO: layoutId={`card-${project.id}`} <-- ESTO CAUSABA EL HUECO
            whileHover={{ y: -5 }} // Agregamos un pequeño efecto hover simple
            onClick={onClick}
            className={cn(
                "relative group rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 transition-all duration-300 h-full flex flex-col cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10",
                isDevMode && "hover:bg-transparent cursor-crosshair"
            )}
        >
            {/* CAPA OCULTA DEV MODE */}
            {isDevMode && (
                <div className="absolute inset-0 -z-10 bg-black/50 flex items-center justify-center">
                    <div className="text-[10px] font-mono text-primary border border-primary px-2 bg-black">
                        &lt;Card id="{project.id}" layout="{isWeb ? 'Web' : 'Mobile'}" /&gt;
                    </div>
                </div>
            )}

            {/* CONTENIDO VISIBLE */}
            <div className={cn("p-5 flex-1 transition-opacity duration-300", isDevMode && "group-hover:opacity-10")}>

                {/* Icono de Expandir */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/60 backdrop-blur text-white p-2 rounded-full border border-white/10">
                        <Maximize2 size={14} />
                    </div>
                </div>

                {isWeb ? (
                    // LAYOUT WEB
                    <div className="flex flex-col h-full">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-5 shrink-0 bg-black">
                            <Image src={mainImage} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
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
                    // LAYOUT MOBILE
                    <div className="flex gap-5 h-full">
                        <div className="relative w-36 shrink-0 aspect-[9/19] rounded-lg overflow-hidden border border-white/10 bg-black shadow-2xl group-hover:border-primary/30 transition-colors">
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

                            <div className="grid grid-cols-2 gap-2 mt-auto opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-medium flex items-center justify-center gap-1.5">
                                    <ExternalLink size={12} /> Info
                                </div>
                                <div className="py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-medium flex items-center justify-center gap-1.5">
                                    <Github size={12} /> Code
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
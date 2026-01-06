"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Smartphone, Monitor } from "lucide-react";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

// Definimos la interfaz del Proyecto
export interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    tags: string[];
    demo_link?: string;
    repo_link?: string;
    project_type: 'web' | 'mobile'; // Esto define el layout
}

export default function ProjectCard({ project }: { project: Project }) {
    const { isDevMode } = useDevMode();
    const isWeb = project.project_type === 'web';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "relative group rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 transition-all duration-500",
                isDevMode && "hover:bg-transparent hover:border-primary/50 cursor-crosshair" // Efecto Dev
            )}
        >
            {/* --- CAPA OCULTA "DEV MODE" (EL MONO CON PLATILLOS / TECH SPECS) --- */}
            {isDevMode && (
                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center bg-black opacity-0 group-hover:opacity-100 transition-opacity p-4 text-center">
                    <div className="text-primary font-mono text-xs mb-2 tracking-widest border border-primary px-2 py-1 rounded">
                        COMPONENT: &lt;ProjectCard type="{project.project_type}" /&gt;
                    </div>
                    <p className="text-[10px] text-gray-500 font-mono">
                        ID: {project.id} | Render: Client-Side <br />
                        Img Source: {project.image_url.slice(0, 20)}...
                    </p>
                    {/* Aquí podrías poner la imagen del mono de fondo con baja opacidad */}
                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm90eW54Ynd4Ynd4Ynd4/l3vRlT2k2L35Cnn5C/giphy.gif')] bg-cover opacity-10 pointer-events-none mix-blend-screen" />
                </div>
            )}

            {/* --- CONTENIDO VISIBLE --- */}
            <div className={cn(
                "grid gap-6 p-6 transition-opacity duration-300",
                isDevMode && "group-hover:opacity-10" // Se desvanece en modo Dev para ver el fondo
            )}>

                {/* LAYOUT WEB: Imagen arriba grande (70%), Texto abajo */}
                {isWeb ? (
                    <>
                        <div className="relative w-full h-64 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors">
                            <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1 border border-white/10">
                                <Monitor size={12} className="text-blue-400" /> Web App
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-gray-300 rounded border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    /* LAYOUT MOBILE: Estilo Lista (Lateral) */
                    <div className="flex gap-6 items-center">
                        <div className="relative w-24 h-40 shrink-0 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors shadow-lg rotate-3 group-hover:rotate-0 duration-300">
                            <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="space-y-3 w-full">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 font-mono mt-1">
                                        <Smartphone size={12} className="text-green-400" /> Mobile / React Native
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-gray-300 rounded border border-white/5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* BOTONES (Comunes a ambos layouts) */}
                <div className="flex gap-3 pt-2">
                    {project.demo_link && (
                        <a href={project.demo_link} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors">
                            <ExternalLink size={14} /> Demo Live
                        </a>
                    )}
                    {project.repo_link && (
                        <a href={project.repo_link} target="_blank" rel="noreferrer" className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors">
                            <Github size={14} /> Code
                        </a>
                    )}
                </div>

            </div>
        </motion.div>
    );
}
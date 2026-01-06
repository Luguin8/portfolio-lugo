"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { Terminal, ChevronLeft, ChevronRight } from "lucide-react";

// Recibimos los proyectos reales como props
export default function ProjectGridClient({ initialProjects }: { initialProjects: any[] }) {
    const [isManual, setIsManual] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Si no hay proyectos, mostrar mensaje o usar mocks de fallback (opcional)
    const projects = initialProjects.length > 0 ? initialProjects : [];

    // Duplicamos x3 para efecto infinito (solo si hay proyectos)
    const infiniteProjects = projects.length > 0 ? [...projects, ...projects, ...projects] : [];

    const handleManualControl = (direction: 'prev' | 'next') => {
        setIsManual(true);
        if (direction === 'prev') {
            setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
        } else {
            setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
        }
    };

    if (projects.length === 0) {
        return (
            <section id="projects" className="py-32 px-6 flex justify-center text-gray-500">
                <p>No hay proyectos cargados aún. Ve al /admin</p>
            </section>
        );
    }

    return (
        <section id="projects" className="py-32 px-6 relative overflow-hidden">

            <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                <div>
                    <div className="flex items-center gap-2 text-primary font-mono text-sm mb-4">
                        <Terminal size={16} />
                        <span>~/projects</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        Arquitectura & <span className="text-gray-500">Desarrollo</span>
                    </h2>
                    <p className="text-gray-400 max-w-lg">
                        {isManual ? "Modo Manual Activado." : "Selección de trabajos recientes."}
                    </p>
                </div>

                <div className="flex gap-2">
                    <button onClick={() => handleManualControl('prev')} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:scale-110 active:scale-95">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => handleManualControl('next')} className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:scale-110 active:scale-95">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            <div className="relative w-full">
                {!isManual ? (
                    <div className="flex overflow-hidden mask-gradient-sides">
                        <motion.div
                            className="flex gap-8 px-4"
                            animate={{ x: ["0%", "-33.33%"] }}
                            transition={{ duration: 45, ease: "linear", repeat: Infinity }}
                        >
                            {infiniteProjects.map((project, idx) => (
                                <div key={`${project.id}-${idx}-inf`} className="w-[350px] md:w-[450px] shrink-0 h-full">
                                    <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {[0, 1, 2].map((offset) => {
                                const project = projects[(currentIndex + offset) % projects.length];
                                return project ? (
                                    <ProjectCard key={`${project.id}-manual`} project={project} onClick={() => setSelectedProject(project)} />
                                ) : null;
                            })}
                        </motion.div>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>

        </section>
    );
}
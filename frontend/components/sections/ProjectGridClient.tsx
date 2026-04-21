"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { playNavigate, playSelect } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export default function ProjectGridClient({ initialProjects }: { initialProjects: any[] }) {
    const [isManual, setIsManual] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState<string>("all");

    const projects = initialProjects.length > 0 ? initialProjects : [];
    const filteredProjects = filter === "all" ? projects : projects.filter(p => p.project_type === filter);
    const infiniteProjects = filteredProjects.length > 0 ? [...filteredProjects, ...filteredProjects, ...filteredProjects] : [];

    const handleManualControl = (direction: 'prev' | 'next') => {
        setIsManual(true);
        if (filteredProjects.length === 0) return;
        if (direction === 'prev') {
            setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
        } else {
            setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
        }
    };

    const handleFilter = (type: string) => {
        playSelect();
        setFilter(type);
        setCurrentIndex(0);
        setIsManual(true);
    };

    if (projects.length === 0) {
        return (
            <section
                id="projects"
                className="py-28 px-6 flex justify-center"
                style={{ borderTop: "1px solid var(--bb-border)" }}
            >
                <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}>
                    No hay obras registradas aún.
                </p>
            </section>
        );
    }

    return (
        <section
            id="projects"
            className="py-28 px-6 relative overflow-hidden"
            style={{ borderTop: "1px solid var(--bb-border)", borderBottom: "1px solid var(--bb-border)" }}
        >
            {/* Section header */}
            <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end">
                <div>
                    <p
                        className="text-xs tracking-[0.3em] uppercase mb-3"
                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.28em" }}
                    >
                        ✦ &nbsp; INVENTARIO DE OBRAS
                    </p>
                    <h2
                        className="text-4xl md:text-5xl mb-2"
                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)" }}
                    >
                        Arquitectura &{" "}
                        <span style={{ color: "var(--bb-white)" }}>Desarrollo</span>
                    </h2>
                    <div className="bb-separator" style={{ maxWidth: "300px" }} />
                    <p
                        className="mt-3 text-base"
                        style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "var(--bb-muted)" }}
                    >
                        {isManual ? "Exploración manual activada." : "Selección de trabajos recientes."}
                    </p>
                </div>

                {/* Navigation arrows & Filters */}
                <div className="flex flex-col items-end gap-4">
                    <div className="flex flex-wrap justify-end gap-2">
                        {['all', 'web', 'mobile', 'desktop'].map((type) => (
                            <button
                                key={type}
                                onClick={() => handleFilter(type)}
                                className={cn(
                                    "px-3 py-1 text-xs uppercase tracking-widest border transition-colors",
                                    filter === type
                                        ? "border-bb-gold text-bb-gold bg-bb-gold/10"
                                        : "border-bb-border text-bb-muted hover:border-bb-gold hover:text-bb-gold"
                                )}
                                style={{ fontFamily: "var(--font-title)" }}
                            >
                                {type === 'all' ? 'Todos' : type}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => { playSelect(); handleManualControl('prev'); }}
                            className="p-3 border transition-all duration-200 border-bb-border text-bb-muted hover:border-bb-gold hover:text-bb-gold bg-transparent"
                            onMouseEnter={() => playNavigate()}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => { playSelect(); handleManualControl('next'); }}
                            className="p-3 border transition-all duration-200 border-bb-border text-bb-muted hover:border-bb-gold hover:text-bb-gold bg-transparent"
                            onMouseEnter={() => playNavigate()}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid / Carousel */}
            <div className="relative w-full">
                {!isManual ? (
                    <div className="flex overflow-hidden mask-gradient-sides">
                        <motion.div
                            className="flex gap-6 px-4"
                            animate={{ x: ["0%", "-33.33%"] }}
                            transition={{ duration: 50, ease: "linear", repeat: Infinity }}
                        >
                            {infiniteProjects.map((project, idx) => (
                                <div key={`${project.id}-${idx}-inf`} className="w-[340px] md:w-[430px] shrink-0 h-full">
                                    <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        {filteredProjects.length === 0 ? (
                            <p className="text-center italic font-body text-bb-muted py-10">
                                No hay proyectos en esta categoría.
                            </p>
                        ) : (
                            <motion.div
                                key={`${currentIndex}-${filter}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredProjects.length < 3 
                                    ? filteredProjects.map((project, idx) => (
                                        <ProjectCard key={`${project.id}-manual-${idx}`} project={project} onClick={() => setSelectedProject(project)} />
                                    ))
                                    : [0, 1, 2].map((offset) => {
                                        const project = filteredProjects[(currentIndex + offset) % filteredProjects.length];
                                        return project ? (
                                            <ProjectCard key={`${project.id}-manual-${offset}`} project={project} onClick={() => setSelectedProject(project)} />
                                        ) : null;
                                    })
                                }
                            </motion.div>
                        )}
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
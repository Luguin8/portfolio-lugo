"use client";

import { motion } from "framer-motion";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import { Terminal } from "lucide-react";

// --- DATOS HARDCODEADOS PARA DEMO ---
const MOCK_PROJECTS: Project[] = [
    {
        id: 1,
        title: "DCA King Interface",
        description: "Plataforma integral para gestión de Bots de Trading Cripto. Desarrollada con FastAPI y React, maneja miles de transacciones concurrentes.",
        tags: ["Python", "FastAPI", "React", "Docker", "PostgreSQL"],
        image_url: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop", // Crypto Dashboard Stock
        project_type: "web",
        demo_link: "https://example.com",
        repo_link: "https://github.com",
    },
    {
        id: 2,
        title: "Ebook 'Florecillas'",
        description: "App nativa de lectura accesible con motor TTS (Text-to-Speech) y ajustes tipográficos dinámicos. Publicada en Play Store.",
        tags: ["React Native", "Expo", "TypeScript", "AdMob", "SQLite"],
        image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop", // Book App Stock
        project_type: "mobile",
        demo_link: "https://google.com",
        repo_link: "https://github.com",
    }
];

export default function ProjectsGrid() {
    return (
        <section id="projects" className="py-32 px-6 relative">

            {/* Título de la Sección */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="flex items-center gap-2 text-primary font-mono text-sm mb-4">
                    <Terminal size={16} />
                    <span>~/projects</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Arquitectura & <span className="text-gray-500">Desarrollo</span>
                </h2>
                <p className="text-gray-400 max-w-2xl text-lg">
                    Una selección de sistemas complejos, aplicaciones móviles y herramientas de automatización.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_PROJECTS.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>

        </section>
    );
}
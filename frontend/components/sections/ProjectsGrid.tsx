"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard, { Project } from "@/components/ui/ProjectCard";
import { Terminal, ChevronLeft, ChevronRight } from "lucide-react";

// --- DATOS MOCK CON GALERÍA ---
const MOCK_PROJECTS: Project[] = [
    {
        id: 1,
        title: "DCA King Interface",
        description: "Plataforma integral para gestión de Bots de Trading Cripto. Desarrollada con FastAPI y React, maneja miles de transacciones concurrentes.\n\nEl sistema permite a los usuarios configurar estrategias de Dollar Cost Averaging (DCA) de manera visual, monitorear el rendimiento en tiempo real mediante gráficos interactivos y recibir alertas instantáneas. La arquitectura backend utiliza Docker para escalar los microservicios de manera eficiente.",
        tags: ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Recharts"],
        images: [
            "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2070&auto=format&fit=crop", // Dashboard Principal
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Analytics View
            "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"  // Server Logs
        ],
        project_type: "web",
        demo_link: "#",
        repo_link: "#",
    },
    {
        id: 2,
        title: "Ebook 'Florecillas'",
        description: "App nativa de lectura accesible con motor TTS (Text-to-Speech) y ajustes tipográficos dinámicos. Publicada en Play Store.\n\nDiseñada pensando en la accesibilidad, ofrece modos de alto contraste, tipografía especial para dislexia y marcadores sincronizados en la nube. La integración con AdMob permite la monetización no intrusiva.",
        tags: ["React Native", "Expo", "TypeScript", "AdMob", "SQLite"],
        images: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop", // Reading View
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", // Library
            "https://images.unsplash.com/photo-1526222553026-721d304abda9?q=80&w=2070&auto=format&fit=crop"  // Settings
        ],
        project_type: "mobile",
        demo_link: "#",
        repo_link: "#",
    },
    {
        id: 3,
        title: "Stock Control System",
        description: "Sistema de inventario No-Code con AppSheet para gestión de semillas.\n\nPermite el escaneo de códigos QR para ingreso/egreso de stock, generación automática de reportes PDF y control de usuarios por roles. Funciona offline y sincroniza datos cuando hay conexión.",
        tags: ["AppSheet", "Google Sheets", "Automation", "No-Code"],
        images: [
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", // Warehouse
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"  // Tablet UI
        ],
        project_type: "web",
        demo_link: "#",
    },
    {
        id: 4,
        title: "DriverBoost AI",
        description: "Chatbot inteligente para atención al cliente y calificación de leads.\n\nUtiliza la API de OpenAI para entender intenciones complejas de los usuarios y derivarlos al departamento correcto. Integrado con WhatsApp Business API.",
        tags: ["Python", "OpenAI", "Typebot", "WhatsApp API"],
        images: [
            "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop", // AI Abstract
            "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"  // Chat UI
        ],
        project_type: "web",
        demo_link: "#",
    }
];

export default function ProjectsGrid() {
    const [isManual, setIsManual] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Duplicamos x3 para efecto infinito
    const infiniteProjects = [...MOCK_PROJECTS, ...MOCK_PROJECTS, ...MOCK_PROJECTS];

    const handleManualControl = (direction: 'prev' | 'next') => {
        setIsManual(true);
        if (direction === 'prev') {
            setCurrentIndex((prev) => (prev === 0 ? MOCK_PROJECTS.length - 1 : prev - 1));
        } else {
            setCurrentIndex((prev) => (prev === MOCK_PROJECTS.length - 1 ? 0 : prev + 1));
        }
    };

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
                        {isManual
                            ? "Modo Manual Activado. Usa las flechas para navegar."
                            : "Carrusel Infinito. Pasa el mouse para pausar o haz clic en una tarjeta para ver detalles."}
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

            <div className="relative w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                {!isManual ? (
                    <div className="flex overflow-hidden mask-gradient-sides">
                        <motion.div
                            className="flex gap-8 px-4"
                            animate={{ x: ["0%", "-33.33%"] }}
                            transition={{ duration: 30, ease: "linear", repeat: Infinity, playState: isPaused ? "paused" : "running" }}
                            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                        >
                            {infiniteProjects.map((project, idx) => (
                                <div key={`${project.id}-${idx}`} className="w-[350px] md:w-[450px] shrink-0 h-full">
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {[0, 1, 2].map((offset) => {
                                const project = MOCK_PROJECTS[(currentIndex + offset) % MOCK_PROJECTS.length];
                                return <ProjectCard key={project.id} project={project} />;
                            })}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
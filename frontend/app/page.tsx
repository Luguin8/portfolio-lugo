"use client";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <Hero />

      {/* Placeholder de Skills (Fase siguiente) */}
      <section id="skills" className="h-[50vh] flex items-center justify-center border-t border-white/5 bg-[#151515]">
        <h2 className="text-4xl font-mono text-gray-600">[ FASE 2.5: SKILLS GRID ]</h2>
      </section>

      {/* SECCIÓN PROYECTOS REAL */}
      <ProjectsGrid />

      <Contact />
    </main>
  );
}
"use client";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <Hero />

      {/* ESPACIOS RESERVADOS (Placeholders) */}
      <section id="skills" className="h-screen flex items-center justify-center border-t border-white/5">
        <h2 className="text-4xl font-mono text-gray-600">[ FASE 2: SKILLS GRID ]</h2>
      </section>

      <section id="projects" className="h-screen flex items-center justify-center border-t border-white/5">
        <h2 className="text-4xl font-mono text-gray-600">[ FASE 3: PROYECTOS ]</h2>
      </section>

      <section id="contact" className="h-[50vh] flex items-center justify-center border-t border-white/5">
        <h2 className="text-4xl font-mono text-gray-600">[ FASE 4: CONTACTO ]</h2>
      </section>

    </main>
  );
}
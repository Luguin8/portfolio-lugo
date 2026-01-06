// BORRA LA LÍNEA: "use client"; 
// (No debe estar aquí. page.tsx debe ser Server Component)

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid"; // Este es Async (Server)
import SkillsGrid from "@/components/sections/SkillsGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <Hero />

      <SkillsGrid />

      {/* Al ser page.tsx un Server Component, Next.js esperará a que 
          ProjectsGrid termine de cargar los datos antes de enviar el HTML */}
      <ProjectsGrid />

      <Contact />

    </main>
  );
}
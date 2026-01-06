"use client";

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import SkillsGrid from "@/components/sections/SkillsGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <Hero />

      <SkillsGrid />

      <ProjectsGrid />

      <Contact />
    </main>
  );
}
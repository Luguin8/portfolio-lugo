// app/page.tsx  – Server Component
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import SkillsGrid from "@/components/sections/SkillsGrid";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bb-bg)" }}>
      <Navbar />
      <Hero />
      <SkillsGrid />
      <ProjectsGrid />
      <Contact />
    </main>
  );
}
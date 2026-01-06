import Navbar from "@/components/ui/Navbar"
import Hero from "@/components/sections/Hero"
import SkillsGrid from "@/components/sections/SkillsGrid"
import ProjectCard from "@/components/ui/ProjectCard"

// Datos Semilla (Seed Data) basados en tu perfil
const INITIAL_PROJECTS = [
  {
    title: "DCA King Interface",
    description: "Plataforma de Trading automatizado implementada con Python y FastAPI. Gestión de estrategias DCA en exchanges centralizados.",
    tags: ["Python", "FastAPI", "Docker", "Trading"],
    imageUrl: "/projects/dca.jpg", // Asegúrate de poner imágenes en public/projects/
    repoUrl: "https://github.com/luguin8"
  },
  {
    title: "DriverBoostIA",
    description: "Chatbot de automatización para logística. Integra IA para optimizar respuestas a conductores.",
    tags: ["Python", "LLMs", "Automation"],
    imageUrl: "/projects/driver.jpg",
    repoUrl: "https://github.com/luguin8"
  },
  {
    title: "Multiplayer 3rd Person Shooter",
    description: "Videojuego desarrollado en Godot 4 con lógica de red personalizada.",
    tags: ["Godot 4", "GDScript", "Networking"],
    imageUrl: "/projects/shooter.jpg",
    repoUrl: "https://github.com/luguin8"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      <Navbar />

      <Hero />

      <SkillsGrid />

      <section id="projects" className="py-20 max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-mono font-bold mb-10 border-l-4 border-primary pl-4">
          Proyectos Destacados
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>

      {/* Footer simple */}
      <footer className="text-center text-gray-600 py-10 text-sm font-mono border-t border-border mt-20">
        <p>Built by Lugo Martin Adrian © {new Date().getFullYear()}</p>
        <p>Corrientes, Argentina</p>
      </footer>
    </main>
  )
}
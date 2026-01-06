"use client"

import { useDevMode } from "@/components/providers/DevModeProvider"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ProjectProps {
    title: string
    description: string
    tags: string[]
    imageUrl: string
    repoUrl?: string
    demoUrl?: string
}

export default function ProjectCard({ project }: { project: ProjectProps }) {
    const { isDevMode } = useDevMode()

    return (
        <div className={`group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all ${isDevMode ? "dev-border" : ""}`}>
            {isDevMode && <span className="dev-label">SOURCE: Supabase DB</span>}

            <div className="relative h-48 w-full overflow-hidden">
                {/* Placeholder si no hay imagen real aún, usando gradiente */}
                {project.imageUrl ? (
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black" />
                )}
            </div>

            <div className="p-6">
                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono px-2 py-1 bg-background border border-border rounded text-gray-300">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-white text-gray-400 transition-colors">
                            <Github size={16} /> Code
                        </a>
                    )}
                    {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-white text-gray-400 transition-colors">
                            <ExternalLink size={16} /> Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
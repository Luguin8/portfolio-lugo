"use client"

import { useDevMode } from "@/components/providers/DevModeProvider"
import { Layout, Server, Database, Wrench } from "lucide-react"

const skills = {
    Frontend: ["React 19", "Next.js 16", "Tailwind v4", "React Native"],
    Backend: ["Python 3.12", "FastAPI", "Node.js", "Docker"],
    Data: ["Supabase", "PostgreSQL", "Pandas", "Monte Carlo Sims"],
    Tools: ["Git", "AppSheet", "Godot 4", "Linux"]
}

export default function SkillsGrid() {
    const { isDevMode } = useDevMode()

    return (
        <div className={`py-20 bg-surface/30 ${isDevMode ? "dev-border" : ""}`}>
            {isDevMode && <span className="dev-label">DATA: Hardcoded JSON</span>}

            <div className="max-w-6xl mx-auto px-4">
                <h3 className="text-2xl font-mono font-bold mb-10 text-center"><span className="text-primary">&lt;</span> Tech_Stack <span className="text-primary">/&gt;</span></h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(skills).map(([category, items], idx) => (
                        <div key={category} className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-4 text-primary">
                                {category === 'Frontend' && <Layout />}
                                {category === 'Backend' && <Server />}
                                {category === 'Data' && <Database />}
                                {category === 'Tools' && <Wrench />}
                                <h4 className="font-bold">{category}</h4>
                            </div>
                            <ul className="space-y-2">
                                {items.map((item) => (
                                    <li key={item} className="text-sm text-gray-400 font-mono flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
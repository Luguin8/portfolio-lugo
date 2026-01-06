"use client"

import Link from "next/link"
import { useDevMode } from "@/components/providers/DevModeProvider"
import { Terminal, Code, User } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
    const { isDevMode, toggleDevMode } = useDevMode()

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-border/40 bg-background/80">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-mono font-bold text-xl text-primary">
                    <Terminal size={20} />
                    <span>LUGO_DEV</span>
                </Link>

                {/* Links & Toggle */}
                <div className="flex items-center gap-6">
                    <Link href="#projects" className="hover:text-primary transition-colors text-sm font-medium">Proyectos</Link>
                    <Link href="#contact" className="hover:text-primary transition-colors text-sm font-medium">Contacto</Link>

                    {/* Dev Mode Toggle */}
                    <button
                        onClick={toggleDevMode}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all text-xs font-mono
              ${isDevMode
                                ? "border-dev text-dev bg-dev/10 shadow-[0_0_10px_rgba(0,255,157,0.2)]"
                                : "border-gray-600 text-gray-400 hover:border-gray-400"}`}
                    >
                        {isDevMode ? <Code size={14} /> : <User size={14} />}
                        <span>{isDevMode ? "DEV VIEW" : "USER VIEW"}</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
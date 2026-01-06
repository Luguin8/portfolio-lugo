"use client"

import { motion } from "framer-motion"
import { useDevMode } from "@/components/providers/DevModeProvider"

export default function Hero() {
    const { isDevMode } = useDevMode()

    return (
        <section className={`min-h-screen flex items-center justify-center pt-16 ${isDevMode ? "dev-border" : ""}`}>
            {isDevMode && <span className="dev-label">COMPONENT: Hero.tsx (Client Side)</span>}

            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-block px-3 py-1 mb-4 border border-primary/30 rounded-full bg-primary/10 text-primary font-mono text-sm">
                        Available for hire
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Lugo</span>.
                    </h1>

                    <h2 className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
                        Full Stack Developer <span className="text-primary mx-2">|</span> Python Ecosystem & React Next.js
                    </h2>

                    <p className="max-w-2xl mx-auto text-gray-500 mb-10 leading-relaxed">
                        Arquitecto soluciones escalables desde <span className="text-white font-medium">Corrientes, Argentina</span>.
                        Especializado en trading algorítmico, automatización e interfaces de usuario de alto rendimiento.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-all">
                            Ver Proyectos
                        </button>
                        <button className="px-6 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white rounded-lg transition-all">
                            Descargar CV
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
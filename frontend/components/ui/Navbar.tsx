"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code, Menu, X, Lock, ShieldAlert, LogIn, Monitor, Smartphone } from "lucide-react"; // Agregué iconos extra por si acaso
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { isDevMode, toggleDevMode } = useDevMode();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Función optimizada para detectar scroll
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSimulateAdmin = () => {
        setShowLoginModal(false);
        router.push("/admin?mode=simulation");
    };

    const navLinks = [
        { name: "Inicio", href: "#hero" },
        { name: "Skills", href: "#skills" },
        { name: "Proyectos", href: "#projects" },
        { name: "Contacto", href: "#contact" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[50] transition-all duration-300 border-b",
                    // Aquí está la corrección: Fondo transparente por defecto, Glass oscuro al bajar
                    isScrolled
                        ? "bg-[#121212]/85 backdrop-blur-xl border-white/10 shadow-lg py-2"
                        : "bg-transparent border-transparent py-4"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    <Link href="/" className="group flex items-center gap-2 font-mono text-lg font-bold tracking-tighter">
                        <span className="text-primary group-hover:animate-pulse">&gt;</span>
                        <span className="text-white group-hover:text-primary transition-colors">~/lugo_martin</span>
                        <span className="w-2 h-4 bg-primary animate-pulse ml-1" />
                    </Link>

                    {/* DESKTOP LINKS */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* ACTIONS RIGHT */}
                    <div className="flex items-center gap-4">

                        <button
                            onClick={toggleDevMode}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-all",
                                isDevMode
                                    ? "bg-primary/10 border-primary text-primary shadow-[0_0_10px_rgba(102,71,169,0.3)]"
                                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                            )}
                        >
                            {isDevMode ? <Code size={14} /> : <Eye size={14} />}
                            <span className="hidden sm:inline">{isDevMode ? "DEV: ON" : "VIEW: USER"}</span>
                        </button>

                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            title="Acceso Admin"
                        >
                            <Lock size={18} />
                        </button>

                        <button
                            className="md:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* LOGIN MODAL (Sin cambios funcionales, solo asegurando que funciona) */}
            <AnimatePresence>
                {showLoginModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowLoginModal(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-400 to-primary" />

                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Lock size={20} className="text-primary" /> Acceso Restringido
                            </h2>
                            <p className="text-gray-400 text-sm mb-6">Identifícate para acceder al Panel de Control.</p>

                            <form className="space-y-4 mb-6">
                                {/* Inputs ficticios */}
                                <div>
                                    <label className="text-xs font-mono text-gray-500 uppercase">System ID</label>
                                    <input type="email" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white" placeholder="admin@lugo.dev" />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-gray-500 uppercase">Passcode</label>
                                    <input type="password" className="w-full bg-black/30 border border-white/10 rounded p-2 text-white" placeholder="••••••••" />
                                </div>
                                <button type="button" className="w-full py-2 bg-white/5 border border-white/10 text-gray-400 rounded cursor-not-allowed">
                                    Ingresar (Deshabilitado)
                                </button>
                            </form>

                            <button
                                onClick={handleSimulateAdmin}
                                className="w-full py-3 bg-primary/10 border border-primary/50 text-primary hover:bg-primary/20 rounded-lg transition-all flex items-center justify-center gap-2 group font-medium"
                            >
                                <ShieldAlert size={18} className="group-hover:animate-pulse" />
                                Simular Admin (Modo Demo)
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-40 bg-[#121212] pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-xl font-mono">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-primary">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
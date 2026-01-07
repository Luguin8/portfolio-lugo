"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Code, Lock, LogIn, ShieldAlert } from "lucide-react";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";
import { loginAction, enableDemoMode } from "@/lib/actions";

export default function Navbar() {
    const { isDevMode, toggleDevMode } = useDevMode();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    async function handleLogin(formData: FormData) {
        const res = await loginAction({ success: false, message: "" }, formData);
        if (res.success) {
            setShowLoginModal(false);
            router.push("/admin");
        } else {
            setLoginMessage(res.message);
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[50] transition-all duration-300 border-b",
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

                    <div className="hidden md:flex items-center gap-8">
                        {/* LINKS CORREGIDOS: Solo funcionan si las secciones tienen id="..." */}
                        {["Hero", "Skills", "Projects", "Contact"].map((name) => (
                            <Link key={name} href={`#${name.toLowerCase()}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                                {name === "Hero" ? "Inicio" : name === "Projects" ? "Proyectos" : name === "Contact" ? "Contacto" : name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleDevMode} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-all", isDevMode ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-white/10 text-gray-400")}>
                            {isDevMode ? <Code size={14} /> : <Eye size={14} />}
                            <span className="hidden sm:inline">{isDevMode ? "DEV: ON" : "VIEW: USER"}</span>
                        </button>

                        <button onClick={() => setShowLoginModal(true)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                            <Lock size={18} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* LOGIN MODAL */}
            <AnimatePresence>
                {showLoginModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-400 to-primary" />
                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <Lock size={20} className="text-primary" /> Acceso Admin
                            </h2>

                            <form action={handleLogin} className="space-y-4 mt-4">
                                <div>
                                    <label className="text-xs font-mono text-gray-500 uppercase">Contraseña Maestra</label>
                                    <input name="password" type="password" required className="w-full bg-black/30 border border-white/10 rounded p-2 text-white focus:border-primary focus:outline-none" placeholder="••••••••" />
                                </div>
                                {loginMessage && <p className="text-red-400 text-xs">{loginMessage}</p>}

                                <button type="submit" className="w-full py-2 bg-primary hover:bg-primary/90 text-white rounded font-medium flex items-center justify-center gap-2">
                                    <LogIn size={16} /> Entrar
                                </button>
                            </form>

                            <div className="my-4 flex items-center gap-2 opacity-50">
                                <div className="h-[1px] bg-white/20 flex-1" />
                                <span className="text-xs">O</span>
                                <div className="h-[1px] bg-white/20 flex-1" />
                            </div>

                            {/* BOTÓN DEMO RESTAURADO */}
                            <form action={enableDemoMode}>
                                <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded font-medium flex items-center justify-center gap-2 transition-colors">
                                    <ShieldAlert size={16} /> Simular Admin (Demo)
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
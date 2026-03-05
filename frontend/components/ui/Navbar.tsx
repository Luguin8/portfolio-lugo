"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogIn, Shield, Eye } from "lucide-react";
import { useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";
import { loginAction, enableDemoMode } from "@/lib/actions";
import {
    playNavigate,
    playSelect,
    playOpen,
    playClose,
    playInsightGain,
    playInsightLoss,
    playError,
} from "@/lib/sounds";

const NAV_LINKS = [
    { href: "#hero", label: "Inicio" },
    { href: "#skills", label: "Arsenal" },
    { href: "#projects", label: "Obras" },
    { href: "#contact", label: "Contacto" },
];

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

    function handleInsightToggle() {
        if (isDevMode) {
            playInsightLoss();
        } else {
            playInsightGain();
        }
        toggleDevMode();
    }

    function openLoginModal() {
        playOpen();
        setShowLoginModal(true);
        setLoginMessage("");
    }

    function closeLoginModal() {
        playClose();
        setShowLoginModal(false);
    }

    async function handleLogin(formData: FormData) {
        const res = await loginAction({ success: false, message: "" }, formData);
        if (res.success) {
            playSelect();
            setShowLoginModal(false);
            router.push("/admin");
        } else {
            playError();
            setLoginMessage(res.message);
        }
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cn("fixed top-0 left-0 right-0 z-[50] transition-all duration-500", isScrolled ? "border-b" : "border-b border-transparent")}
                style={isScrolled ? {
                    background: "rgba(5, 4, 3, 0.96)",
                    borderBottomColor: "var(--bb-border)",
                    backdropFilter: "blur(12px)",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                } : {
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                        style={{ textDecoration: "none" }}
                        onMouseEnter={() => playNavigate()}
                        onClick={() => playSelect()}
                    >
                        <span
                            className="text-base leading-none transition-colors duration-300"
                            style={{ color: "var(--bb-gold)", fontFamily: "var(--font-title)" }}
                        >
                            ✦
                        </span>
                        <span
                            className="text-base font-semibold tracking-widest transition-colors duration-300 group-hover:text-white"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.25em" }}
                        >
                            LUGO MARTIN
                        </span>
                        <span
                            className="text-base leading-none transition-colors duration-300"
                            style={{ color: "var(--bb-gold)", fontFamily: "var(--font-title)" }}
                        >
                            ✦
                        </span>
                    </Link>

                    {/* NAV LINKS */}
                    <div className="hidden md:flex items-center gap-10">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative group text-sm tracking-widest transition-all duration-200"
                                style={{
                                    fontFamily: "var(--font-title)",
                                    color: "var(--bb-muted)",
                                    letterSpacing: "0.18em",
                                    fontSize: "0.72rem",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.color = "var(--bb-gold)";
                                    playNavigate();
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.color = "var(--bb-muted)";
                                }}
                                onClick={() => playSelect()}
                            >
                                {link.label}
                                <span
                                    className="absolute bottom-[-3px] left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                                    style={{ background: "var(--bb-gold-dim)" }}
                                />
                            </Link>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-4">

                        {/* ── INSIGHT STAT ROW BUTTON ── */}
                        <button
                            onClick={handleInsightToggle}
                            onMouseEnter={() => playNavigate()}
                            className="group flex items-center gap-2 px-3 py-1.5 border transition-all duration-300"
                            style={{
                                fontFamily: "var(--font-title)",
                                borderColor: isDevMode ? "var(--bb-gold)" : "var(--bb-border)",
                                background: isDevMode ? "rgba(201,168,76,0.08)" : "transparent",
                                boxShadow: isDevMode ? "0 0 14px rgba(201,168,76,0.18), inset 0 0 8px rgba(201,168,76,0.06)" : "none",
                            }}
                            title={isDevMode ? "Desactivar Insight" : "Activar Insight"}
                        >
                            {/* Eye icon */}
                            <Eye
                                size={13}
                                className="transition-all duration-300"
                                style={{
                                    color: isDevMode ? "var(--bb-gold)" : "var(--bb-muted)",
                                    filter: isDevMode ? "drop-shadow(0 0 4px rgba(201,168,76,0.60))" : "none",
                                }}
                            />
                            {/* INSIGHT label */}
                            <span
                                className="text-[0.62rem] tracking-widest transition-colors duration-300 hidden sm:inline"
                                style={{
                                    color: isDevMode ? "var(--bb-gold)" : "var(--bb-muted)",
                                    letterSpacing: "0.22em",
                                }}
                            >
                                INSIGHT
                            </span>
                            {/* Separator dot */}
                            <span
                                className="transition-colors duration-300 text-[0.62rem] hidden sm:inline"
                                style={{ color: isDevMode ? "var(--bb-gold)" : "var(--bb-border)" }}
                            >
                                ·
                            </span>
                            {/* Numeric value */}
                            <span
                                className="text-[0.62rem] font-semibold tabular-nums transition-all duration-300"
                                style={{
                                    color: isDevMode ? "var(--bb-gold-bright)" : "var(--bb-muted)",
                                    textShadow: isDevMode ? "0 0 8px rgba(232,200,122,0.70)" : "none",
                                    letterSpacing: "0.05em",
                                }}
                            >
                                {isDevMode ? "1" : "0"}
                            </span>
                        </button>

                        {/* Lock */}
                        <button
                            onClick={openLoginModal}
                            onMouseEnter={() => playNavigate()}
                            className="p-2 transition-colors duration-200"
                            style={{ color: "var(--bb-muted)" }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)"; }}
                            onFocus={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)"; }}
                            onBlur={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)"; }}
                        >
                            <Lock size={15} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── LOGIN MODAL ── */}
            <AnimatePresence>
                {showLoginModal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0"
                            style={{ background: "rgba(3,2,1,0.88)", backdropFilter: "blur(4px)" }}
                            onClick={closeLoginModal}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="bb-corner-box relative w-full max-w-sm p-8"
                            style={{ background: "var(--bb-panel)", border: "1px solid var(--bb-border)" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="bb-corner-tr" />
                            <span className="bb-corner-bl" />

                            <div className="bb-separator mb-6" />

                            <h2
                                className="text-lg mb-1 flex items-center gap-3"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.15em" }}
                            >
                                <Lock size={15} style={{ color: "var(--bb-gold)" }} />
                                ACCESO RESTRINGIDO
                            </h2>
                            <p className="text-sm mb-6" style={{ color: "var(--bb-muted)", fontFamily: "var(--font-body)", fontStyle: "italic" }}>
                                Solo para el cazador autorizado.
                            </p>

                            <form action={handleLogin} className="space-y-4">
                                <div>
                                    <label
                                        className="block text-xs tracking-widest mb-2 uppercase"
                                        style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.18em" }}
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="bb-input"
                                        placeholder="••••••••"
                                        onFocus={() => playNavigate()}
                                    />
                                </div>
                                {loginMessage && (
                                    <p className="text-xs" style={{ color: "var(--bb-crimson)", fontFamily: "var(--font-body)" }}>
                                        ✦ {loginMessage}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="bb-btn w-full"
                                    onMouseEnter={() => playNavigate()}
                                    onClick={() => playSelect()}
                                >
                                    <LogIn size={14} />
                                    Ingresar
                                </button>
                            </form>

                            <div className="bb-separator my-5" />

                            <form action={enableDemoMode}>
                                <button
                                    type="submit"
                                    className="bb-btn-secondary w-full"
                                    onMouseEnter={() => playNavigate()}
                                    onClick={() => playSelect()}
                                >
                                    <Shield size={14} />
                                    Modo Demo
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
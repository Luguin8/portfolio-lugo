"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogIn, Shield, Volume2, VolumeX, Menu, X } from "lucide-react";
import { loginAction, enableDemoMode } from "@/lib/actions";
import {
    playNavigate,
    playSelect,
    playOpen,
    playClose,
    playError,
    startAmbient,
    stopAmbient,
} from "@/lib/sounds";

const NAV_LINKS = [
    { href: "#hero", label: "Inicio" },
    { href: "#skills", label: "Arsenal" },
    { href: "#projects", label: "Obras" },
    { href: "#process", label: "Proceso" },
    { href: "#contact", label: "Contacto" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginMessage, setLoginMessage] = useState("");
    const [isAmbientOn, setIsAmbientOn] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    function toggleAmbient() {
        if (isAmbientOn) {
            stopAmbient();
        } else {
            startAmbient();
        }
        setIsAmbientOn(!isAmbientOn);
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll while the mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

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
                className="fixed top-0 left-0 right-0 z-[50] transition-all duration-500"
                style={{
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    ...(isScrolled
                        ? {
                            // Subtle backdrop that reads as depth, not a divider rule.
                            background: "rgba(5, 4, 3, 0.92)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            boxShadow: "0 14px 34px -18px rgba(0, 0, 0, 0.9)",
                        }
                        : {}),
                }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

                    {/* LOGO */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 sm:gap-3 shrink-0"
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
                            className="text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-300 group-hover:text-white"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.18em" }}
                        >
                            LUGO MARTIN
                        </span>
                        <span
                            className="hidden sm:inline text-base leading-none transition-colors duration-300"
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
                                className="relative group text-sm tracking-widest transition-all duration-200 bb-nav-flicker"
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
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* Ambient sound toggle (desktop; on mobile it lives in the menu) */}
                        <button
                            onClick={toggleAmbient}
                            onMouseEnter={() => playNavigate()}
                            className="hidden md:block p-2 transition-colors duration-200"
                            style={{ color: isAmbientOn ? "var(--bb-gold)" : "var(--bb-muted)" }}
                            title={isAmbientOn ? "Silenciar ambiente" : "Activar ambiente sonoro"}
                        >
                            {isAmbientOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
                        </button>

                        {/* Lock (desktop; on mobile it lives in the menu) */}
                        <button
                            onClick={openLoginModal}
                            onMouseEnter={() => playNavigate()}
                            className="hidden md:block p-2 transition-colors duration-200"
                            style={{ color: "var(--bb-muted)" }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)"; }}
                            onFocus={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-gold)"; }}
                            onBlur={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--bb-muted)"; }}
                        >
                            <Lock size={15} />
                        </button>

                        {/* Hamburger (mobile only) */}
                        <button
                            onClick={() => { playOpen(); setMobileOpen(true); }}
                            className="md:hidden p-2 transition-colors duration-200"
                            style={{ color: "var(--bb-gold)" }}
                            aria-label="Abrir menú"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── MOBILE MENU ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-[70] md:hidden flex flex-col"
                        style={{ background: "rgba(4, 3, 2, 0.985)", backdropFilter: "blur(6px)" }}
                    >
                        <div className="flex items-center justify-between px-6" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                            <span
                                className="text-base font-semibold tracking-widest"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", letterSpacing: "0.25em" }}
                            >
                                ✦ &nbsp;LUGO MARTIN
                            </span>
                            <button
                                onClick={() => { playClose(); setMobileOpen(false); }}
                                className="p-2"
                                style={{ color: "var(--bb-gold)" }}
                                aria-label="Cerrar menú"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="bb-separator mx-6" />

                        <nav className="flex-1 flex flex-col justify-center gap-2 px-8">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => { playSelect(); setMobileOpen(false); }}
                                        className="block py-4 text-2xl tracking-[0.14em] uppercase"
                                        style={{
                                            fontFamily: "var(--font-title)",
                                            color: "var(--bb-white)",
                                            textDecoration: "none",
                                            borderBottom: "1px solid var(--bb-border-dim)",
                                        }}
                                    >
                                        <span style={{ color: "var(--bb-gold)", marginRight: "0.6rem", fontSize: "0.7em" }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="px-8 pb-10 flex items-center gap-6">
                            <button
                                onClick={() => { toggleAmbient(); }}
                                className="flex items-center gap-2 text-xs tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-title)", color: isAmbientOn ? "var(--bb-gold)" : "var(--bb-muted)" }}
                            >
                                {isAmbientOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                {isAmbientOn ? "Ambiente ON" : "Ambiente OFF"}
                            </button>
                            <button
                                onClick={() => { setMobileOpen(false); openLoginModal(); }}
                                className="flex items-center gap-2 text-xs tracking-widest uppercase"
                                style={{ fontFamily: "var(--font-title)", color: "var(--bb-muted)" }}
                            >
                                <Lock size={13} /> Acceso
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
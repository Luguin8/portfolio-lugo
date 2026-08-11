"use client";

import { useState, useEffect } from "react";

// Fires once per full page load (root layout mounts once per session in the
// App Router) — a brief gothic intro before the page is revealed.
export default function LoadingScreen({ message = "Entrando al Sueño del Cazador" }: { message?: string }) {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        const fadeTimer = setTimeout(() => setFading(true), 900);
        const removeTimer = setTimeout(() => {
            setVisible(false);
            document.body.style.overflow = "";
        }, 1400);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
            document.body.style.overflow = "";
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500"
            style={{
                background: "var(--bb-bg)",
                opacity: fading ? 0 : 1,
                pointerEvents: fading ? "none" : "auto",
            }}
            aria-hidden="true"
        >
            <div className="text-center px-6">
                <p
                    className="text-xl mb-5 font-title text-bb-gold"
                    style={{ animation: "bb-flicker 1.8s ease-in-out infinite" }}
                >
                    ✦
                </p>
                <p className="text-[0.65rem] tracking-[0.35em] uppercase font-title text-bb-muted">
                    {message}
                </p>
            </div>
        </div>
    );
}

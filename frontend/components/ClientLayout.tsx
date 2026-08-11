"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { initAudioContext } from "@/lib/sounds";
import ScrollVial from "@/components/ui/ScrollVial";
import VisitTracker from "@/components/VisitTracker";
import ClickBurst from "@/components/ClickBurst";
import ScrollParallax from "@/components/ScrollParallax";
import LoadingScreen from "@/components/LoadingScreen";

export default function ClientLayout({ children, fontVariables }: { children: ReactNode; fontVariables: string }) {
    // Initialize AudioContext on first user gesture (browser policy)
    useEffect(() => {
        const init = () => {
            initAudioContext();
            window.removeEventListener("pointerdown", init);
            window.removeEventListener("keydown", init);
        };
        window.addEventListener("pointerdown", init);
        window.addEventListener("keydown", init);
        return () => {
            window.removeEventListener("pointerdown", init);
            window.removeEventListener("keydown", init);
        };
    }, []);

    // Easter egg for whoever opens devtools
    useEffect(() => {
        console.log(
            "%cFear the old blood.",
            "color:#d4ae52; font-family: Georgia, serif; font-size: 20px; font-style: italic; text-shadow: 0 0 8px rgba(212,174,82,0.6);"
        );
        console.log(
            "%cSi estás mirando esto, probablemente seas dev. Hablemos → lugoamartin@gmail.com",
            "color:#a89a7a; font-family: monospace; font-size: 12px;"
        );
    }, []);

    return (
        <body
            className={cn("antialiased min-h-screen relative", fontVariables)}
            style={{ background: "var(--bb-bg)", color: "var(--bb-white)", fontFamily: "var(--font-body)" }}
        >
            <LoadingScreen />

            {/* ── FOG LAYER (pure CSS) ── */}
            <div className="bb-fog-layer" aria-hidden="true">
                <div className="bb-fog-mid" />
            </div>

            {/* ── GROUND FOG (low rolling gothic mist) ── */}
            <div className="bb-ground-fog" aria-hidden="true" />

            {/* ── EMBER PARTICLES ── */}
            <div className="bb-embers" aria-hidden="true">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bb-ember" />
                ))}
            </div>

            {/* ── FILM GRAIN ── */}
            <div className="bb-grain" aria-hidden="true" />

            {/* ── SCANLINES ── */}
            <div className="bb-scanlines" aria-hidden="true" />

            {/* ── SUBTLE VIGNETTE (breathing pulse) ── */}
            <div
                className="fixed inset-0 pointer-events-none z-[3] bb-vignette-pulse"
                style={{
                    background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 38%, rgba(3,2,1,0.60) 100%)"
                }}
                aria-hidden="true"
            />

            {/* ── SCROLL PROGRESS VIAL ── */}
            <ScrollVial />

            <VisitTracker />
            <ClickBurst />
            <ScrollParallax />

            {/* ── MAIN CONTENT ── */}
            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </body>
    );
}

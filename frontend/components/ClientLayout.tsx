"use client";

import { ReactNode, useEffect } from "react";
import { DevModeProvider, useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";
import { initAudioContext } from "@/lib/sounds";

function LayoutContent({ children, fontVariables }: { children: ReactNode; fontVariables: string }) {
    const { isDevMode, mousePos } = useDevMode();
    const radius = 160;

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

    return (
        <body
            className={cn("antialiased min-h-screen relative", fontVariables)}
            style={{ background: "var(--bb-bg)", color: "var(--bb-white)", fontFamily: "var(--font-body)" }}
        >
            {/* ── FOG LAYER (pure CSS) ── */}
            <div className="bb-fog-layer" aria-hidden="true">
                <div className="bb-fog-mid" />
            </div>

            {/* ── SUBTLE VIGNETTE ── */}
            <div
                className="fixed inset-0 pointer-events-none z-[1]"
                style={{
                    background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3,2,1,0.55) 100%)"
                }}
                aria-hidden="true"
            />

            {/* ── INSIGHT / DEV MODE LAYER ──
                Visible BEHIND the main content via the cursor mask hole.
                Shows the Bloodborne stats screen as a ghostly underworld. */}
            <div
                className="fixed inset-0 z-[2] pointer-events-none overflow-hidden"
                aria-hidden="true"
                style={{
                    opacity: isDevMode ? 1 : 0,
                    transition: "opacity 0.8s ease",
                }}
            >
                {/* Bloodborne stats.jpg – very faint, desaturated */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/bloodborne/stats.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        opacity: 0.14,
                        filter: "grayscale(25%) sepia(30%) brightness(0.7)",
                    }}
                />
                {/* Dark veil to keep text readable */}
                <div
                    className="absolute inset-0"
                    style={{ background: "rgba(5,4,3,0.72)" }}
                />
                {/* Floating BB stat-label watermarks */}
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-8 opacity-20">
                    {[
                        "VITALITY       ——",
                        "ENDURANCE      ——",
                        "STRENGTH       ——",
                        "SKILL          ——",
                        "BLOODTINGE     ——",
                        "ARCANE         ——",
                    ].map((label) => (
                        <p
                            key={label}
                            className="text-xs tracking-[0.35em]"
                            style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)" }}
                        >
                            {label}
                        </p>
                    ))}
                </div>
                {/* "INSIGHT" overlay text */}
                <div
                    className="absolute top-6 left-8 text-[0.6rem] tracking-[0.4em] uppercase"
                    style={{ fontFamily: "var(--font-title)", color: "var(--bb-gold)", opacity: 0.5 }}
                >
                    INSIGHT MODE ACTIVE
                </div>
            </div>

            {/* ── MAIN CONTENT (masked by cursor hole in insight mode) ── */}
            <div
                className="relative z-10 min-h-screen transition-[mask-image] duration-75"
                style={isDevMode ? {
                    maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent ${radius}px, black ${radius + 1}px)`,
                    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent ${radius}px, black ${radius + 1}px)`,
                    cursor: "none",
                } : undefined}
            >
                {children}
            </div>

            {/* ── INSIGHT CURSOR ── */}
            {isDevMode && (
                <div
                    className="fixed pointer-events-none flex items-center justify-center z-[99999]"
                    style={{
                        left: mousePos.x - radius,
                        top: mousePos.y - radius,
                        width: radius * 2,
                        height: radius * 2,
                        border: "1px solid var(--bb-gold)",
                        boxShadow: "0 0 24px rgba(201,168,76,0.20), inset 0 0 16px rgba(201,168,76,0.06)",
                    }}
                >
                    {/* Inner crosshair */}
                    <div style={{ position: "absolute", width: "1px", height: "14px", background: "var(--bb-gold)", opacity: 0.6 }} />
                    <div style={{ position: "absolute", width: "14px", height: "1px", background: "var(--bb-gold)", opacity: 0.6 }} />
                    {/* Corner accents on cursor */}
                    {["top-1 left-1", "top-1 right-1", "bottom-1 left-1", "bottom-1 right-1"].map((pos) => (
                        <div
                            key={pos}
                            className={`absolute ${pos} w-3 h-3`}
                            style={{
                                borderColor: "var(--bb-gold)",
                                borderStyle: "solid",
                                borderWidth: pos.includes("top") && pos.includes("left") ? "1px 0 0 1px"
                                    : pos.includes("top") ? "1px 1px 0 0"
                                        : pos.includes("left") ? "0 0 1px 1px"
                                            : "0 1px 1px 0",
                                opacity: 0.7,
                            }}
                        />
                    ))}
                    {/* Coordinates HUD */}
                    <div
                        className="absolute top-[-28px] left-1/2 -translate-x-1/2 text-[9px] px-2 py-0.5 border whitespace-nowrap"
                        style={{
                            fontFamily: "var(--font-title)",
                            color: "var(--bb-gold)",
                            borderColor: "var(--bb-border)",
                            background: "rgba(5,4,3,0.90)",
                            letterSpacing: "0.15em",
                        }}
                    >
                        {Math.round(mousePos.x)} · {Math.round(mousePos.y)}
                    </div>
                </div>
            )}
        </body>
    );
}

export default function ClientLayout({ children, fontVariables }: { children: ReactNode; fontVariables: string }) {
    return (
        <DevModeProvider>
            <LayoutContent fontVariables={fontVariables}>
                {children}
            </LayoutContent>
        </DevModeProvider>
    );
}
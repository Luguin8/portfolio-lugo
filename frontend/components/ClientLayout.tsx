"use client";

import { ReactNode } from "react";
import { DevModeProvider, useDevMode } from "@/components/providers/DevModeProvider";
import { cn } from "@/lib/utils";

function LayoutContent({ children, fontVariables }: { children: ReactNode; fontVariables: string }) {
    const { isDevMode, mousePos } = useDevMode();
    const radius = 150;

    return (
        <body
            className={cn(
                "antialiased min-h-screen relative",
                fontVariables
            )}
            style={{ background: "var(--bb-bg)", color: "var(--bb-white)", fontFamily: "var(--font-body)" }}
        >
            {/* ── FOG LAYER (pure CSS, no images) ── */}
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

            {/* ── MAIN CONTENT ── */}
            <div
                className="relative z-10 min-h-screen transition-all duration-75"
                style={isDevMode ? {
                    maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent ${radius}px, black ${radius + 1}px)`,
                    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent ${radius}px, black ${radius + 1}px)`,
                    cursor: "none",
                } : undefined}
            >
                {children}
            </div>

            {/* ── DEV MODE CURSOR ── */}
            {isDevMode && (
                <div
                    className="fixed pointer-events-none flex items-center justify-center z-[99999]"
                    style={{
                        left: mousePos.x - radius,
                        top: mousePos.y - radius,
                        width: radius * 2,
                        height: radius * 2,
                        border: "1px solid var(--bb-gold)",
                        boxShadow: "0 0 30px rgba(201,168,76,0.25), inset 0 0 20px rgba(201,168,76,0.08)",
                    }}
                >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--bb-gold)" }} />
                    <div
                        className="absolute top-[-28px] left-1/2 -translate-x-1/2 text-[10px] bg-black/90 px-2 py-0.5 border"
                        style={{ color: "var(--bb-gold)", borderColor: "var(--bb-border)", fontFamily: "var(--font-title)", letterSpacing: "0.1em" }}
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
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

// Purely cosmetic — reacts to route changes via usePathname(), never
// intercepts Link clicks or calls router.push itself. Next.js's own
// navigation is completely untouched; this only plays an "eyelid"
// overlay on top of it once the route has changed.
export default function PageTransition() {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const [phase, setPhase] = useState<"idle" | "closed" | "open">("idle");

    useEffect(() => {
        if (prevPathname.current === pathname) return;
        prevPathname.current = pathname;

        setPhase("closed");
        const openTimer = setTimeout(() => setPhase("open"), 320);
        const idleTimer = setTimeout(() => setPhase("idle"), 680);
        return () => {
            clearTimeout(openTimer);
            clearTimeout(idleTimer);
        };
    }, [pathname]);

    if (phase === "idle") return null;

    const closed = phase === "closed";
    const barStyle: CSSProperties = {
        position: "absolute",
        left: 0,
        right: 0,
        height: closed ? "50%" : "0%",
        background: "var(--bb-bg)",
        transition: "height 340ms ease-in-out",
    };

    return (
        <div className="fixed inset-0 z-[9998] pointer-events-none" aria-hidden="true">
            <div style={{ ...barStyle, top: 0, borderBottom: closed ? "1px solid var(--bb-gold-dim)" : "none" }} />
            <div style={{ ...barStyle, bottom: 0, borderTop: closed ? "1px solid var(--bb-gold-dim)" : "none" }} />
            {closed && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "var(--bb-gold)", boxShadow: "0 0 12px rgba(212,174,82,0.7)" }}
                    />
                </div>
            )}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";

export default function ScrollVial() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="fixed right-5 top-1/2 -translate-y-1/2 z-[60] w-[3px] h-40 pointer-events-none hidden lg:block"
            style={{ background: "rgba(90,70,35,0.22)", border: "1px solid var(--bb-border)" }}
            aria-hidden="true"
        >
            <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                    height: `${progress * 100}%`,
                    background: "linear-gradient(to top, var(--bb-gold-dim), var(--bb-gold-bright))",
                    boxShadow: "0 0 6px rgba(212,174,82,0.5)",
                    transition: "height 0.1s linear",
                }}
            />
        </div>
    );
}

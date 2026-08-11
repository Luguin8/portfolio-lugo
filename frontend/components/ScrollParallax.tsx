"use client";

import { useEffect } from "react";

// Writes the current scroll position to a CSS custom property (rAF-throttled)
// instead of React state, so the fog/ground-fog layers can react to scroll
// via pure CSS transforms without triggering re-renders.
export default function ScrollParallax() {
    useEffect(() => {
        let ticking = false;

        const update = () => {
            document.documentElement.style.setProperty("--scroll-parallax", `${window.scrollY}px`);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return null;
}

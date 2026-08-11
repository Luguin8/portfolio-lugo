"use client";

import { useEffect } from "react";

// Triggers a brief brightness "puff" on the ground fog whenever a section
// boundary crosses the middle band of the viewport — reads like a wisp of
// mist thickening as you cross from one section into the next.
export default function FogWipe() {
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        const fog = document.querySelector(".bb-ground-fog") as HTMLElement | null;
        if (!fog || sections.length === 0) return;

        let lastPuff = 0;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const now = Date.now();
                    if (now - lastPuff < 700) return; // debounce rapid crossings
                    lastPuff = now;
                    fog.classList.remove("bb-fog-puff");
                    void fog.offsetWidth; // force reflow to restart the animation
                    fog.classList.add("bb-fog-puff");
                });
            },
            { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return null;
}

"use client";

import { useEffect } from "react";

// Spawns a short-lived burst of ember particles at the click point whenever
// a .bb-btn / .bb-btn-secondary element is clicked. Uses raw DOM nodes
// instead of React state so a click doesn't trigger a re-render anywhere.
export default function ClickBurst() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement)?.closest(".bb-btn, .bb-btn-secondary");
            if (!target) return;

            const rect = target.getBoundingClientRect();
            const x = e.clientX || rect.left + rect.width / 2;
            const y = e.clientY || rect.top + rect.height / 2;

            const count = 8;
            for (let i = 0; i < count; i++) {
                const particle = document.createElement("div");
                const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
                const distance = 26 + Math.random() * 26;
                const dx = Math.cos(angle) * distance;
                const dy = Math.sin(angle) * distance;
                const size = 2 + Math.random() * 2;

                particle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, #f0d07e 0%, rgba(212,174,82,0.4) 70%);
                    box-shadow: 0 0 5px 1px rgba(212,174,82,0.4);
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.3, 1), opacity 0.55s ease-out;
                    opacity: 1;
                `;
                document.body.appendChild(particle);

                requestAnimationFrame(() => {
                    particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
                    particle.style.opacity = "0";
                });

                setTimeout(() => particle.remove(), 600);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
}

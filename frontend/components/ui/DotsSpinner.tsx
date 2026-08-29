"use client";

import type { CSSProperties } from "react";

type DotsSpinnerProps = {
    /** Number of dots in the ring. */
    count?: number;
    /** Ring diameter in pixels. */
    size?: number;
    /** Single dot diameter in pixels. */
    dotSize?: number;
    /** Full rotation duration, in seconds. */
    speed?: number;
    /** CSS color for the dots (defaults to currentColor, so it inherits from a parent's text color). */
    color?: string;
    /** Accessible label read by screen readers. */
    label?: string;
    className?: string;
};

/**
 * A ring of dots that rotates while each dot pulses in sequence,
 * chasing itself around the circle. Pure CSS — no per-frame JS.
 */
export default function DotsSpinner({
    count = 8,
    size = 48,
    dotSize = 6,
    speed = 1.6,
    color = "currentColor",
    label = "Cargando",
    className = "",
}: DotsSpinnerProps) {
    const dots = Array.from({ length: count });
    const radius = (size - dotSize) / 2;

    return (
        <div
            role="status"
            aria-label={label}
            className={`ds-ring ${className}`}
            style={
                {
                    "--ds-size": `${size}px`,
                    "--ds-dot": `${dotSize}px`,
                    "--ds-radius": `${radius}px`,
                    "--ds-speed": `${speed}s`,
                    "--ds-color": color,
                    width: size,
                    height: size,
                } as CSSProperties
            }
        >
            {dots.map((_, i) => (
                <span
                    key={i}
                    className="ds-dot"
                    style={
                        {
                            "--ds-i": i,
                            "--ds-n": count,
                        } as React.CSSProperties
                    }
                />
            ))}
            <span className="sr-only">{label}…</span>

            <style jsx>{`
                .ds-ring {
                    position: relative;
                    animation: ds-spin var(--ds-speed) linear infinite;
                }
                .ds-dot {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: var(--ds-dot);
                    height: var(--ds-dot);
                    margin: calc(var(--ds-dot) / -2);
                    border-radius: 50%;
                    background: var(--ds-color);
                    transform: rotate(calc(360deg / var(--ds-n) * var(--ds-i)))
                        translateY(calc(var(--ds-radius) * -1));
                    animation: ds-pulse var(--ds-speed) ease-in-out infinite;
                    animation-delay: calc(
                        var(--ds-speed) / var(--ds-n) * var(--ds-i) * -1
                    );
                }
                @keyframes ds-spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
                @keyframes ds-pulse {
                    0%,
                    100% {
                        opacity: 0.15;
                        transform: rotate(calc(360deg / var(--ds-n) * var(--ds-i)))
                            translateY(calc(var(--ds-radius) * -1)) scale(0.6);
                    }
                    50% {
                        opacity: 1;
                        transform: rotate(calc(360deg / var(--ds-n) * var(--ds-i)))
                            translateY(calc(var(--ds-radius) * -1)) scale(1);
                    }
                }
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
                @media (prefers-reduced-motion: reduce) {
                    .ds-ring,
                    .ds-dot {
                        animation-duration: 3s;
                    }
                }
            `}</style>
        </div>
    );
}

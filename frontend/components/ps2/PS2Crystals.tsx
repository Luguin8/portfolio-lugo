"use client";

import React, { useEffect, useRef } from 'react';

// 12 hexagonal crystal towers arranged like clock hour markers. The one
// matching the current hour glows cyan and fills based on minutes elapsed,
// exactly as on the reference site.

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function PS2Crystals() {
    const hexRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lastHour = useRef(-1);
    const lastFill = useRef(-1);

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            const now = new Date();
            const hour = now.getHours() % 12;
            const fill = Math.round(100 - (now.getMinutes() / 60) * 100);

            if (hour !== lastHour.current) {
                hexRefs.current.forEach((el, i) => {
                    el?.classList.toggle('hour-active', i === hour);
                });
                lastHour.current = hour;
            }
            if (fill !== lastFill.current) {
                hexRefs.current[hour]?.style.setProperty('--fill', `${fill}%`);
                lastFill.current = fill;
            }

            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div id="ps2-shapes">
            {HOURS.map((h, i) => (
                <div
                    key={h}
                    ref={(el) => { hexRefs.current[i] = el; }}
                    className={`shape hex s${h}`}
                    style={{ animationDelay: `${-i * 2.4}s` }}
                >
                    <div className="face side s-1" />
                    <div className="face side s-2" />
                    <div className="face side s-3" />
                    <div className="face side s-4" />
                    <div className="face side s-5" />
                    <div className="face side s-6" />
                    <div className="face cap top" />
                    <div className="face cap bottom" />
                </div>
            ))}
        </div>
    );
}

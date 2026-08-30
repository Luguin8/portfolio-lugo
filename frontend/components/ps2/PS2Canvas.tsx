"use client";

import React, { useEffect, useRef } from 'react';

const DESIGN_WIDTH = 2560;

export default function PS2Canvas({ children }: { children?: React.ReactNode }) {
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resize = () => {
            const el = canvasRef.current;
            if (!el) return;
            const scale = window.innerWidth / DESIGN_WIDTH;
            const height = window.innerHeight / scale;
            el.style.transform = `scale(${scale})`;
            el.style.height = `${height}px`;
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="ps2-viewport">
            <div className="ps2-canvas" ref={canvasRef}>
                {children}
            </div>
            <div className="crt-overlay" />
        </div>
    );
}

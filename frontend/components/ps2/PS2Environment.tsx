"use client";

import React, { useEffect, useRef } from 'react';
import PS2Clock from './PS2Clock';
import PS2Crystals from './PS2Crystals';

const DESIGN_WIDTH = 2560;

interface PS2EnvironmentProps {
    children?: React.ReactNode;
    /** Extra decorative elements from the reference site, reused on other screens (e.g. about) but not the main menu. */
    showCubes?: boolean;
    showCrystals?: boolean;
    /** Zooms the scene in (clock/crystals scale up, cubes push back) like the reference site's about screen. */
    aboutMode?: boolean;
}

export default function PS2Environment({ children, showCubes = false, showCrystals = false, aboutMode = false }: PS2EnvironmentProps) {
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
                <div className="ps2-container">
                    <div className={`ps2-scene${aboutMode ? ' about-mode' : ''}`} id="main-ps2-scene">
                        <PS2Clock />

                        {showCrystals && <PS2Crystals />}

                        {showCubes && (
                            <div id="ps2-cubes">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={`cube c${i}`}>
                                        <div className="cube-face c-front"></div>
                                        <div className="cube-face c-back"></div>
                                        <div className="cube-face c-right"></div>
                                        <div className="cube-face c-left"></div>
                                        <div className="cube-face c-top"></div>
                                        <div className="cube-face c-bottom"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {children}
                </div>
            </div>

            <div className="crt-overlay" />
        </div>
    );
}

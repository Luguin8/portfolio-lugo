"use client";

import React from 'react';
import PS2Canvas from './PS2Canvas';
import PS2Clock from './PS2Clock';
import PS2Crystals from './PS2Crystals';

interface PS2EnvironmentProps {
    children?: React.ReactNode;
    /** Extra decorative elements from the reference site, reused on other screens (e.g. about) but not the main menu. */
    showCubes?: boolean;
    showCrystals?: boolean;
    /** Zooms the scene in (clock/crystals scale up, cubes push back) like the reference site's about screen. */
    aboutMode?: boolean;
}

export default function PS2Environment({ children, showCubes = false, showCrystals = false, aboutMode = false }: PS2EnvironmentProps) {
    return (
        <PS2Canvas>
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
        </PS2Canvas>
    );
}

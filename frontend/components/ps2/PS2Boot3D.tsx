"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const BootScene = dynamic(() => import('./boot3d/BootScene'), { ssr: false });

const DURATION_MS = 2250; // 9s original ÷ TIME_SCALE (4) from BootScene.tsx

export default function PS2Boot3D({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const t = setTimeout(onDone, DURATION_MS);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div className="ps2-boot3d">
            <div className="ps2-boot3d-text">Sony Computer Entertainment</div>
            <BootScene />
        </div>
    );
}

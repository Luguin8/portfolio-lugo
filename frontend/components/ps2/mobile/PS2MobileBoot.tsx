"use client";

import React, { useEffect } from "react";

const DURATION_MS = 1800;

/** Lightweight CSS-only boot for touch devices (no Three.js). */
export default function PS2MobileBoot({ onDone }: { onDone: () => void }) {
    useEffect(() => {
        const t = setTimeout(onDone, DURATION_MS);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div className="ps2m-boot">
            <span>Sony Computer Entertainment</span>
        </div>
    );
}

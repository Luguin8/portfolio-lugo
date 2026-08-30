"use client";

import React, { useEffect, useRef } from 'react';

// Ported from the real-time rotation-matrix "clock" used on the reference
// site: 7 orbs orbiting a common center under a composite rotation driven by
// the actual system time (seconds/minutes/hours), not a canned CSS keyframe.

type Mat3 = number[]; // row-major, length 9

function matMul3(a: Mat3, b: Mat3): Mat3 {
    const r = new Array(9);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
        }
    }
    return r;
}

function rotZ(t: number): Mat3 {
    const c = Math.cos(t), s = Math.sin(t);
    return [c, -s, 0, s, c, 0, 0, 0, 1];
}

function rotX(t: number): Mat3 {
    const c = Math.cos(t), s = Math.sin(t);
    return [1, 0, 0, 0, c, -s, 0, s, c];
}

function apply3(m: Mat3, v: number[]): number[] {
    return [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
        m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
        m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
    ];
}

const ORB_COUNT = 7;
const DEG_PER_ORB = (6 * Math.PI) / 180;
// Three interpolation anchors the wobble angle cycles through, keyed by minute % 3.
const L = [Math.PI / 2, Math.PI + Math.PI / 6, 0];

export default function PS2Clock() {
    const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            const ms = now.getMilliseconds();
            const minutes = now.getMinutes();
            const r = now.getSeconds() + ms / 1000;

            const totalHours = (3600 * now.getHours() + 60 * minutes + r) / 3600;
            const a = (90 + (totalHours % 12) * -30) * (Math.PI / 180);
            const l = L[minutes % 3] + (r / 60) * (L[(minutes + 1) % 3] - L[minutes % 3]);

            const mat = matMul3(matMul3(rotZ(-Math.PI * r), rotX((Math.PI / 2) * r + l)), rotZ(a));

            for (let t = 0; t < ORB_COUNT; t++) {
                const n = r * t * DEG_PER_ORB;
                const base = [90 * Math.cos(n), 90 * Math.sin(n), 0.2 * t];
                const pos = apply3(mat, base);
                const el = orbRefs.current[t];
                if (el) {
                    el.style.transform = `translate3d(${pos[0]}px, ${pos[1]}px, ${pos[2]}px)`;
                }
            }

            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div className="ps2-clock-system">
            {Array.from({ length: ORB_COUNT }).map((_, i) => (
                <div
                    key={i}
                    ref={(el) => { orbRefs.current[i] = el; }}
                    className="ps2-orb"
                />
            ))}
        </div>
    );
}

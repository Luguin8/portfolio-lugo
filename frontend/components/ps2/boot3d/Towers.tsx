"use client";

import React, { useMemo } from 'react';

const TOWER_SIZE = 7;
const MIN_DISTANCE = TOWER_SIZE + 2;
const AREA = 40;
const MIN_HEIGHT = 10;
const MAX_HEIGHT = 80;

function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateTowers(count: number) {
    const towers: { x: number; y: number; h: number }[] = [];
    let attempts = 0;
    while (towers.length < count && attempts < count * 8) {
        attempts++;
        const x = randomInt(-AREA, AREA);
        const y = randomInt(-AREA, AREA);
        if (Math.abs(x) < 6 && Math.abs(y) < 6) continue; // keep the middle clear
        const overlapping = towers.some((t) => Math.hypot(t.x - x, t.y - y) < MIN_DISTANCE);
        if (!overlapping) {
            towers.push({ x, y, h: randomInt(MIN_HEIGHT, MAX_HEIGHT) });
        }
    }
    return towers;
}

export default function Towers({ count = 45 }: { count?: number }) {
    const towers = useMemo(() => generateTowers(count), [count]);

    return (
        <>
            <ambientLight intensity={0.9} />
            <directionalLight color="#5f5b9a" position={[7, 8, 7]} intensity={13} />
            <directionalLight color="#38518a" position={[0, 0, 110]} intensity={0.4} />
            <directionalLight position={[-5, -5, 50]} intensity={18} color="#000000" />
            <directionalLight position={[-5, -5, 120]} intensity={9} color="#363636" />
            {towers.map((t, i) => (
                <mesh key={i} position={[t.x, t.y, 0]}>
                    <boxGeometry args={[TOWER_SIZE, TOWER_SIZE, t.h]} />
                    <meshStandardMaterial color="#dee0dc" />
                </mesh>
            ))}
        </>
    );
}

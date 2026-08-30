"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

interface ElectronProps {
    speed: number;
    zAxis: number;
    xAxis: number;
    yAxis: number;
    color: string;
    variation: number;
    opposite: number;
}

function Electron({ speed, zAxis, xAxis, yAxis, color, variation, opposite }: ElectronProps) {
    const ref = useRef<THREE.Mesh>(null);
    const z = zAxis - 40;
    const x = xAxis + 10;
    const y = yAxis + 10;

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed - variation;
        if (!ref.current) return;
        ref.current.position.set(
            Math.sin(t) * x * opposite,
            (Math.cos(t) * y * Math.atan(t)) / Math.PI / 1.25,
            Math.sin(t * (30 / 180)) + z
        );
    });

    return (
        <Trail local width={2.5} length={10} color={new THREE.Color(color)} attenuation={(t) => t * t}>
            <mesh ref={ref}>
                <sphereGeometry args={[0.3]} />
                <meshBasicMaterial color={color} toneMapped={false} />
                <pointLight intensity={6} color={color} distance={0} decay={100} />
            </mesh>
        </Trail>
    );
}

export default function Atom() {
    return (
        <group>
            <Electron speed={0.6} zAxis={114} xAxis={10} yAxis={15} color="#40e2a0" variation={Math.random() * 1.9} opposite={1} />
            <Electron speed={1} zAxis={94} xAxis={9} yAxis={16} color="#ff6666" variation={Math.random() * -10} opposite={-1} />
            <Electron speed={1} zAxis={60} xAxis={8} yAxis={18} color="#7cb2e8" variation={Math.random() * 3} opposite={-1} />
            <Electron speed={1} zAxis={80} xAxis={8} yAxis={12} color="#ff69f8" variation={-Math.random()} opposite={1} />
        </group>
    );
}

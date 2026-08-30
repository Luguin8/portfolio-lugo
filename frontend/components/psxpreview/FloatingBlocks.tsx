"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Block = {
    position: [number, number, number];
    size: number;
    color: string;
    spin: [number, number, number];
};

const COLORS = ["#3a2a66", "#1c5a68", "#2d1e52", "#164a56"];

function makeBlocks(count: number): Block[] {
    const blocks: Block[] = [];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 14 + Math.random() * 26;
        blocks.push({
            position: [
                Math.cos(angle) * dist,
                (Math.random() - 0.5) * 18,
                Math.sin(angle) * dist - 10,
            ],
            size: 0.6 + Math.random() * 2.2,
            color: COLORS[i % COLORS.length],
            spin: [
                (Math.random() - 0.5) * 0.08,
                (Math.random() - 0.5) * 0.08,
                (Math.random() - 0.5) * 0.08,
            ],
        });
    }
    return blocks;
}

/** Faint translucent cubes drifting in the distance, purely for a sense
 * of volume/depth in the void — decorative, not interactive. */
export default function FloatingBlocks({ count = 16 }: { count?: number }) {
    const blocks = useMemo(() => makeBlocks(count), [count]);
    const refs = useRef<(THREE.Mesh | null)[]>([]);

    useFrame(() => {
        refs.current.forEach((mesh, i) => {
            if (!mesh) return;
            const b = blocks[i];
            mesh.rotation.x += b.spin[0] * 0.02;
            mesh.rotation.y += b.spin[1] * 0.02;
            mesh.rotation.z += b.spin[2] * 0.02;
        });
    });

    return (
        <group>
            {blocks.map((b, i) => (
                <mesh
                    key={i}
                    position={b.position}
                    ref={(el) => {
                        refs.current[i] = el;
                    }}
                >
                    <boxGeometry args={[b.size, b.size, b.size]} />
                    <meshBasicMaterial
                        color={b.color}
                        transparent
                        opacity={0.14}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
}

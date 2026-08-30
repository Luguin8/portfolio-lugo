"use client";

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GlassCubes() {
    const close = useRef<THREE.Mesh>(null);
    const med = useRef<THREE.Mesh>(null);
    const far = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (close.current) {
            close.current.rotation.z = 1.9 - t / 6;
            close.current.rotation.y = 2.6 - t / 5;
        }
        if (med.current) {
            med.current.rotation.z = -0.5 + t / 6;
            med.current.rotation.y = -1 + t / 6;
        }
        if (far.current) {
            far.current.rotation.x = 1.4 - t / 6;
            far.current.rotation.z = 0.9 - t / 6;
            far.current.rotation.y = 0.7 - t / 6;
        }
    });

    const materialProps = {
        thickness: 1,
        roughness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0,
        transmission: 1,
        ior: 2.3,
        envMapIntensity: 25,
        color: '#4e4e4e',
        reflectivity: 2.1,
        specularIntensity: 1.15,
    };

    return (
        <>
            <mesh position={[-17, -12, 75]} ref={close}>
                <boxGeometry args={[10, 10, 10]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
            <mesh position={[-8, 10, 60]} ref={med}>
                <boxGeometry args={[7, 7, 7]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
            <mesh position={[13, 3, 42]} ref={far}>
                <boxGeometry args={[6, 6, 6]} />
                <meshPhysicalMaterial {...materialProps} />
            </mesh>
        </>
    );
}

"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import { EffectComposer, Vignette, Bloom, Scanline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import Towers from './Towers';
import GlassCubes from './GlassCubes';
import Atom from './Atom';

// Accelerated version of the camera fly-through: same shape, ~4x the speed
// so the whole cinematic clears in a couple seconds instead of ~9s.
function CameraZoom() {
    const startZ = 90;
    const speedRef = useRef(34);
    const rotSpeedRef = useRef(0.2);

    useFrame(({ clock, camera }) => {
        const t = clock.getElapsedTime();
        camera.position.z = startZ - t * speedRef.current;
        camera.rotation.z = -t * rotSpeedRef.current;
        if (t > 1.6) {
            speedRef.current += 1.6;
            rotSpeedRef.current += 0.012;
        }
    });
    return null;
}

function Fog() {
    const { scene } = useThree();
    scene.fog = new THREE.FogExp2('black', 0.01);
    return null;
}

function Effects({ narrow }: { narrow: boolean }) {
    return (
        <EffectComposer>
            <Scanline density={2.0} opacity={0.5} blendFunction={BlendFunction.MULTIPLY} />
            <Vignette offset={0.5} darkness={0.7} blendFunction={BlendFunction.NORMAL} />
            {!narrow && (
                <Bloom radius={0.5} kernelSize={2} intensity={0.2} luminanceThreshold={0.2} luminanceSmoothing={0.5} />
            )}
        </EffectComposer>
    );
}

export default function BootScene() {
    const narrow = typeof window !== 'undefined' && window.innerWidth <= 1080;

    return (
        <Canvas style={{ animation: 'ps2-boot3d-fade 1.5s ease-in' }}>
            <CameraZoom />
            <Fog />
            <Towers count={narrow ? 12 : 45} />
            {!narrow && (
                <>
                    <Cloud position={[0, 0, -25]} speed={0.2} opacity={0.5} scale={[7, 9, 7]} color={new THREE.Color(0x232d61)} seed={1} />
                    <Cloud position={[8, 8, -15]} speed={0} opacity={0.2} scale={[8, 9, 7]} color={new THREE.Color(0x232d61)} seed={1} />
                    <Cloud position={[7, 0, -10]} speed={0} opacity={0.2} scale={[7, 9, 7]} color={new THREE.Color(0x000042)} seed={1} />
                    <Cloud position={[0, 7, -5]} speed={0} opacity={0.2} scale={[7, 7, 7]} color={new THREE.Color(0x000042)} seed={1} />
                </>
            )}
            <Cloud position={[0, 0, 0]} speed={0} opacity={0.1} scale={[9, 16, 9]} color={new THREE.Color(0x4062bb)} seed={1} />
            <Cloud position={[0, 0, 0]} speed={0} opacity={0.9} scale={[16, 16, 26]} color={new THREE.Color(0x000000)} segments={7} seed={1} />
            <GlassCubes />
            <Atom />
            <Effects narrow={narrow} />
        </Canvas>
    );
}

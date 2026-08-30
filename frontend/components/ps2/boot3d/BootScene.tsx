"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';
import Towers from './Towers';
import GlassCubes from './GlassCubes';
import Atom from './Atom';

// Global playback speed multiplier applied uniformly to every animation's
// clock input — like playing the ~9s original clip at 4x, rather than
// hand-tuning each animation separately (which is what broke it last time).
export const TIME_SCALE = 4;

// Same shape as the reference site's CameraZoom, just fed a scaled clock.
function CameraZoom() {
    const cameraStartPosition = 120;
    const speedRef = useRef(4);
    const rotSpeedRef = useRef(0.05);

    useFrame(({ clock, camera }) => {
        const t = clock.getElapsedTime() * TIME_SCALE;
        camera.position.z = cameraStartPosition - t * speedRef.current;
        camera.rotation.z = -t * rotSpeedRef.current;
        if (t > 7) {
            speedRef.current += 0.4;
            rotSpeedRef.current += 0.003;
        }
    });
    return null;
}

function Fog() {
    const { scene } = useThree();
    scene.fog = new THREE.FogExp2('black', 0.01);
    return null;
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
        </Canvas>
    );
}

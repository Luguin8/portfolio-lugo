"use client";

import { useMemo } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec3 vWorldPos;
  void main() {
    vWorldPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Deep void with a faint violet/cyan mist band near the horizon — the
// dome is rendered from the inside (BackSide) as a huge sphere so it
// reads as distant atmosphere behind everything else in the scene.
const fragmentShader = /* glsl */ `
  varying vec3 vWorldPos;
  uniform vec3 uVoid;
  uniform vec3 uViolet;
  uniform vec3 uCyan;

  void main() {
    float h = normalize(vWorldPos).y; // -1 (down) .. 1 (up)
    float band = 1.0 - smoothstep(0.0, 0.55, abs(h - 0.05));
    vec3 mist = mix(uViolet, uCyan, smoothstep(-0.1, 0.35, h));
    vec3 color = mix(uVoid, mist, band * 0.55);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function AtmosphereDome() {
    const uniforms = useMemo(
        () => ({
            uVoid: { value: new THREE.Color("#04030a") },
            uViolet: { value: new THREE.Color("#241542") },
            uCyan: { value: new THREE.Color("#123a4a") },
        }),
        []
    );

    return (
        <mesh scale={[-1, 1, 1]}>
            <sphereGeometry args={[80, 32, 32]} />
            <shaderMaterial
                side={THREE.BackSide}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
            />
        </mesh>
    );
}

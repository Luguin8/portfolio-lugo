"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORB_COUNT = 7;
const TRAIL_SAMPLES = 12;
const TRAIL_STEP = 0.012; // seconds between trail samples

type OrbConfig = {
    multiplier: number; // 1..7 — BIOS-style angular speed multiplier
    radius: number;
    phase: number;
    // each orb's own orbital plane is independently twisted
    pitchAmp: number;
    pitchFreq: number;
    rollAmp: number;
    rollFreq: number;
    yawAmp: number;
    yawFreq: number;
    color: THREE.Color;
};

function buildOrbs(): OrbConfig[] {
    const orbs: OrbConfig[] = [];
    for (let i = 0; i < ORB_COUNT; i++) {
        const multiplier = i + 1;
        orbs.push({
            multiplier,
            radius: 3.4 + i * 0.55,
            phase: i * 0.9,
            pitchAmp: 0.5 + Math.random() * 0.6,
            pitchFreq: 0.15 + Math.random() * 0.12,
            rollAmp: 0.4 + Math.random() * 0.7,
            rollFreq: 0.11 + Math.random() * 0.14,
            yawAmp: 0.3 + Math.random() * 0.5,
            yawFreq: 0.09 + Math.random() * 0.1,
            color: new THREE.Color(i % 2 === 0 ? "#bfe8ff" : "#ffffff"),
        });
    }
    return orbs;
}

/** Position of orb i's center at time t: a fast BIOS-multiplier orbit
 * whose own plane is simultaneously pitching, rolling and yawing on
 * independent slow cycles — a genuinely non-planar, "twisted"
 * trajectory rather than a flat rotating circle. */
function orbPosition(orb: OrbConfig, t: number, baseSpeed: number, out: THREE.Vector3) {
    const angle = t * baseSpeed * orb.multiplier + orb.phase;
    const local = new THREE.Vector3(
        Math.cos(angle) * orb.radius,
        Math.sin(angle) * orb.radius * 0.9,
        0
    );

    const pitch = Math.sin(t * orb.pitchFreq + orb.phase) * orb.pitchAmp;
    const roll = Math.sin(t * orb.rollFreq + orb.phase * 1.7) * orb.rollAmp;
    const yaw = Math.sin(t * orb.yawFreq + orb.phase * 0.6) * orb.yawAmp;

    const euler = new THREE.Euler(pitch, yaw, roll, "XYZ");
    local.applyEuler(euler);

    out.set(local.x, local.y, local.z - 6);
    return out;
}

export default function OrbField({ baseSpeed = 0.9 }: { baseSpeed?: number }) {
    const orbs = useMemo(buildOrbs, []);
    const coreRefs = useRef<(THREE.Mesh | null)[]>([]);
    const glowRefs = useRef<(THREE.Mesh | null)[]>([]);
    const lineRefs = useRef<(THREE.Line | null)[]>([]);

    const trailGeometries = useMemo(
        () =>
            orbs.map(() => {
                const geo = new THREE.BufferGeometry();
                geo.setAttribute(
                    "position",
                    new THREE.BufferAttribute(new Float32Array(TRAIL_SAMPLES * 3), 3)
                );
                geo.setAttribute(
                    "color",
                    new THREE.BufferAttribute(new Float32Array(TRAIL_SAMPLES * 3), 3)
                );
                return geo;
            }),
        [orbs]
    );

    const tmp = useMemo(() => new THREE.Vector3(), []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        orbs.forEach((orb, i) => {
            const pos = orbPosition(orb, t, baseSpeed, tmp);

            const core = coreRefs.current[i];
            const glowMesh = glowRefs.current[i];
            if (core) core.position.copy(pos);
            if (glowMesh) glowMesh.position.copy(pos);

            const geo = trailGeometries[i];
            const posAttr = geo.attributes.position as THREE.BufferAttribute;
            const colAttr = geo.attributes.color as THREE.BufferAttribute;
            const p = new THREE.Vector3();
            for (let k = 0; k < TRAIL_SAMPLES; k++) {
                orbPosition(orb, t - k * TRAIL_STEP, baseSpeed, p);
                posAttr.setXYZ(k, p.x, p.y, p.z);
                const fade = 1 - k / TRAIL_SAMPLES;
                colAttr.setXYZ(
                    k,
                    orb.color.r * fade * fade,
                    orb.color.g * fade * fade,
                    orb.color.b * fade * fade
                );
            }
            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;
        });
    });

    return (
        <group>
            {orbs.map((orb, i) => (
                <group key={i}>
                    <mesh ref={(el) => { coreRefs.current[i] = el; }}>
                        <sphereGeometry args={[0.09, 12, 12]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                    <mesh ref={(el) => { glowRefs.current[i] = el; }}>
                        <sphereGeometry args={[0.28, 12, 12]} />
                        <meshBasicMaterial
                            color={orb.color}
                            transparent
                            opacity={0.35}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                    <primitive
                        object={
                            new THREE.Line(
                                trailGeometries[i],
                                new THREE.LineBasicMaterial({
                                    vertexColors: true,
                                    transparent: true,
                                    blending: THREE.AdditiveBlending,
                                    depthWrite: false,
                                })
                            )
                        }
                        ref={(el: THREE.Line | null) => { lineRefs.current[i] = el; }}
                    />
                </group>
            ))}
        </group>
    );
}

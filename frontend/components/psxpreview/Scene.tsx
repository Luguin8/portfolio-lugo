"use client";

import { Canvas } from "@react-three/fiber";
import AtmosphereDome from "./AtmosphereDome";
import FloatingBlocks from "./FloatingBlocks";
import OrbField from "./OrbField";

export default function Scene() {
    return (
        <Canvas
            camera={{ position: [0, 0.6, 9], fov: 50 }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
        >
            <color attach="background" args={["#03020a"]} />
            <fogExp2 attach="fog" args={["#0a0620", 0.028]} />
            <AtmosphereDome />
            <FloatingBlocks />
            <OrbField />
        </Canvas>
    );
}

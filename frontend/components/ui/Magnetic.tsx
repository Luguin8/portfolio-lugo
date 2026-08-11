"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({
    children,
    strength = 0.35,
}: {
    children: React.ReactNode;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setPos({
            x: (e.clientX - rect.left - rect.width / 2) * strength,
            y: (e.clientY - rect.top - rect.height / 2) * strength,
        });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.1 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}

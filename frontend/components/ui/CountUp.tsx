"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, value, {
            duration: 1.4,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {display}
            {suffix}
        </span>
    );
}

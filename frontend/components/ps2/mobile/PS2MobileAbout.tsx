"use client";

import React, { useEffect } from "react";
import { PS2_TOPICS } from "@/lib/ps2About";
import { initPS2Audio } from "@/lib/ps2Sounds";
import PS2MobileShell from "./PS2MobileShell";

export default function PS2MobileAbout() {
    useEffect(() => {
        const init = () => {
            initPS2Audio();
            window.removeEventListener("pointerdown", init);
        };
        window.addEventListener("pointerdown", init);
        return () => window.removeEventListener("pointerdown", init);
    }, []);

    return (
        <PS2MobileShell title="Sobre Mí">
            <div className="ps2m-scroll">
                {PS2_TOPICS.map((t) => (
                    <div key={t.title} className="ps2m-about-card">
                        <div className="ps2m-yellow">{t.title}</div>
                        <div className="ps2m-cyan">{t.text}</div>
                    </div>
                ))}
            </div>
        </PS2MobileShell>
    );
}

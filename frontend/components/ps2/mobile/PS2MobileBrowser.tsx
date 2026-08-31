"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { PS2_PROJECTS } from "@/lib/ps2Projects";
import { initPS2Audio, playPS2Hover, playPS2Confirm } from "@/lib/ps2Sounds";
import PS2MobileShell from "./PS2MobileShell";

export default function PS2MobileBrowser() {
    const [openId, setOpenId] = useState<number | null>(null);
    const total = PS2_PROJECTS.length;
    const active = PS2_PROJECTS.find((p) => p.id === openId) || null;

    useEffect(() => {
        const init = () => {
            initPS2Audio();
            window.removeEventListener("pointerdown", init);
        };
        window.addEventListener("pointerdown", init);
        return () => window.removeEventListener("pointerdown", init);
    }, []);

    useEffect(() => {
        document.body.style.overflow = openId !== null ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [openId]);

    return (
        <PS2MobileShell title={`Portfolio · ${total} obras`}>
            <div className="ps2m-proj-grid">
                {PS2_PROJECTS.map((p) => (
                    <div
                        key={p.id}
                        className="ps2m-proj-tile"
                        onClick={() => { playPS2Confirm(); setOpenId(p.id); }}
                    >
                        <Image src={p.image} alt={p.title} width={172} height={172} unoptimized />
                        <span>{p.title}</span>
                    </div>
                ))}
            </div>

            {active && (
                <div className="ps2m-sheet" role="dialog" aria-modal="true">
                    <div className="ps2m-topbar">
                        <button className="ps2m-back" onClick={() => { playPS2Confirm(); setOpenId(null); }} aria-label="Cerrar">
                            <ChevronLeft size={22} />
                        </button>
                        <h1>{active.title}</h1>
                    </div>

                    <div className="ps2m-sheet-body">
                        <Image className="ps2m-sheet-img" src={active.image} alt={active.title} width={400} height={400} unoptimized />
                        <div className="ps2m-yellow">{active.title}</div>
                        <div className="ps2m-sheet-sub" style={{ color: "#f0f0f0" }}>{active.tagline}</div>
                        <div className="ps2m-sheet-sub">{active.type} · {active.stack}</div>
                        <p className="ps2m-sheet-desc">{active.desc}</p>
                    </div>

                    <div className="ps2m-sheet-actions">
                        {active.link ? (
                            <a
                                className="ps2m-btn ps2m-btn-primary"
                                href={active.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => playPS2Confirm()}
                            >
                                Launch Title
                            </a>
                        ) : (
                            <span className="ps2m-btn ps2m-btn-disabled">Sin enlace público</span>
                        )}
                        <button
                            className="ps2m-btn"
                            onClick={() => { playPS2Confirm(); setOpenId(null); }}
                            onMouseEnter={() => playPS2Hover()}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </PS2MobileShell>
    );
}

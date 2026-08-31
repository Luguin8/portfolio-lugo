"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { initPS2Audio, playPS2Confirm } from "@/lib/ps2Sounds";
import PS2MobileShell from "./PS2MobileShell";

const MENU_OPTIONS = [
    { id: "sobre-mi", label: "Sobre Mí", path: "/psxemu/about" },
    { id: "proyectos", label: "Proyectos", path: "/psxemu/memory" },
    { id: "faqs", label: "FAQs", path: "/psxemu/faqs" },
    { id: "contact", label: "Contacto", path: "/psxemu/contact" },
];

export default function PS2MobileMenu() {
    useEffect(() => {
        const init = () => {
            initPS2Audio();
            window.removeEventListener("pointerdown", init);
        };
        window.addEventListener("pointerdown", init);
        return () => window.removeEventListener("pointerdown", init);
    }, []);

    return (
        <PS2MobileShell bare>
            <div className="ps2m-menu">
                <div className="ps2m-clockmark" aria-hidden="true" />
                <nav className="ps2m-menu-list">
                    {MENU_OPTIONS.map((o) => (
                        <Link
                            key={o.id}
                            href={o.path}
                            className="ps2m-menu-item"
                            onClick={() => playPS2Confirm()}
                        >
                            {o.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </PS2MobileShell>
    );
}

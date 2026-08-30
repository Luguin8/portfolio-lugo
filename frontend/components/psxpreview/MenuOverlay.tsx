"use client";

import { useState } from "react";

const NAV_ITEMS = ["Home", "Proyectos", "Arsenal", "Trayectoria", "Contacto"];

const FOOTER_ACTIONS = [
    { icon: "△", label: "Atrás" },
    { icon: "○", label: "Seleccionar" },
    { icon: "✕", label: "Idioma" },
    { icon: "✜", label: "Navegar" },
];

export default function MenuOverlay() {
    const [active, setActive] = useState(0);

    return (
        <div className="pointer-events-none absolute inset-0 select-none">
            {/* title, top-left */}
            <p
                className="pointer-events-auto absolute left-8 top-6 text-xs tracking-[0.2em]"
                style={{ color: "#8a94ad", fontFamily: "Arial, Helvetica, sans-serif" }}
            >
                LUGO MARTIN — PORTFOLIO INTERACTIVO
            </p>

            {/* nav, vertically centered on the right */}
            <nav className="pointer-events-auto absolute right-10 top-1/2 flex -translate-y-1/2 flex-col items-end gap-3">
                {NAV_ITEMS.map((item, i) => (
                    <button
                        key={item}
                        onClick={() => setActive(i)}
                        className="text-lg transition-all duration-200"
                        style={
                            i === active
                                ? {
                                      color: "#7fe0ff",
                                      textShadow: "0 0 18px rgba(127,224,255,0.65), 0 0 36px rgba(127,224,255,0.3)",
                                      fontFamily: "Arial, Helvetica, sans-serif",
                                  }
                                : {
                                      color: "#5b6273",
                                      fontFamily: "Arial, Helvetica, sans-serif",
                                  }
                        }
                    >
                        {item}
                    </button>
                ))}
            </nav>

            {/* footer status bar, bottom-center */}
            <div className="pointer-events-auto absolute inset-x-0 bottom-6 flex justify-center">
                <div
                    className="flex items-center gap-7 rounded-sm px-6 py-2.5"
                    style={{
                        background:
                            "repeating-linear-gradient(to bottom, rgba(140,150,170,0.06) 0px, rgba(140,150,170,0.06) 1px, transparent 1px, transparent 3px), rgba(8,10,18,0.75)",
                        border: "1px solid rgba(140,150,170,0.18)",
                        backdropFilter: "blur(3px)",
                    }}
                >
                    {FOOTER_ACTIONS.map((a) => (
                        <div key={a.label} className="flex items-center gap-2">
                            <span style={{ color: "#9aa4bc", fontSize: "0.95rem" }}>{a.icon}</span>
                            <span
                                style={{
                                    color: "#7d859c",
                                    fontSize: "0.68rem",
                                    letterSpacing: "0.08em",
                                    fontFamily: "Arial, Helvetica, sans-serif",
                                }}
                            >
                                {a.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import "./globals.css";
import { DevModeProvider, useDevMode } from "@/components/providers/DevModeProvider";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

function GlobalLayoutContent({ children }: { children: ReactNode }) {
  const { isDevMode, mousePos } = useDevMode();
  const radius = 150;

  return (
    <body className={cn(
      "antialiased bg-[#121212] text-white min-h-screen relative selection:bg-primary selection:text-white",
      inter.variable, mono.variable
    )}>

      {/* CAPA OCULTA (BACKEND VISUAL) - Z-INDEX 0 */}
      <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="font-mono text-[10px] text-green-900/40 absolute top-0 left-0 p-10 leading-tight overflow-hidden w-full h-full break-all whitespace-pre-wrap">
          {Array(1000).fill("01").join(" ")}
        </div>
        <div className="text-center font-mono space-y-2 opacity-50 z-10">
          <h1 className="text-6xl font-bold text-[#1a1a1a] uppercase tracking-widest">System Core</h1>
        </div>
      </div>

      {/* CAPA PRINCIPAL (FRONTEND) - Z-INDEX 10 */}
      <div
        className="relative z-10 bg-[#121212] min-h-screen transition-all duration-75"
        style={isDevMode ? {
          maskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent ${radius}px, black ${radius + 1}px)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at ${mousePos.x}px ${mousePos.y}px, transparent ${radius}px, black ${radius + 1}px)`,
          cursor: 'none'
        } : undefined}
      >
        {children}
      </div>

      {/* CURSOR PERSONALIZADO - Z-INDEX 50 */}
      {isDevMode && (
        <div
          className="absolute pointer-events-none rounded-full flex items-center justify-center z-[99999]"
          style={{
            left: mousePos.x - radius,
            top: mousePos.y - radius,
            width: radius * 2,
            height: radius * 2,
            border: "2px solid #6647A9",
            boxShadow: "0 0 30px rgba(102, 71, 169, 0.6), inset 0 0 20px rgba(102, 71, 169, 0.2)",
            backdropFilter: "invert(0)", // Truco para forzar renderizado de capa
          }}
        >
          {/* El punto central invierte los colores (Negativo) */}
          <div className="w-2 h-2 bg-white rounded-full mix-blend-difference" />

          <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary bg-black/90 px-2 py-1 border border-primary/30 rounded">
            X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}
          </div>
        </div>
      )}

    </body>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth"> {/* Agregado scroll-smooth aquí */}
      <DevModeProvider>
        <GlobalLayoutContent>{children}</GlobalLayoutContent>
      </DevModeProvider>
    </html>
  );
}
"use client";

import "./globals.css";
import { DevModeProvider, useDevMode } from "@/components/providers/DevModeProvider";
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// Componente Wrapper interno para usar el hook useDevMode (ya que layout es server por defecto si no ponemos 'use client' arriba)
function GlobalLayoutContent({ children }: { children: ReactNode }) {
  const { isDevMode, mousePos } = useDevMode();

  return (
    <body className={cn(
      "antialiased bg-[#121212] text-white overflow-x-hidden min-h-screen relative",
      inter.variable, mono.variable
    )}>

      {/* --- CAPA OCULTA (HIDDEN LAYER) --- 
          Solo visible a través del agujero del mouse.
          Es fija y cubre toda la pantalla.
      */}
      {isDevMode && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Fondo genérico Matrix/Circuitos */}
          <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] bg-cover opacity-20" />

          {/* Placeholders por sección (Podemos posicionarlos con CSS absoluto aproximado) */}
          <div className="absolute top-20 left-10 text-green-500 font-mono text-xs">
            [ HIDDEN_HERO_ASSET: MOTHERBOARD.JPG ]
          </div>
          <div className="absolute bottom-20 right-10 text-green-500 font-mono text-xs">
            [ HIDDEN_FOOTER_ASSET: MONKEY_CLAPPING.GIF ]
          </div>
        </div>
      )}

      {/* --- CAPA PRINCIPAL (TOP LAYER) --- 
          Si DevMode está ON, le aplicamos la máscara de agujero.
      */}
      <div
        className="relative z-10 bg-[#121212] transition-all duration-75"
        style={isDevMode ? {
          // El truco: Máscara radial. Transparente en el centro (agujero), negro (visible) afuera.
          maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
          cursor: 'crosshair'
        } : undefined}
      >
        {children}
      </div>

    </body>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <DevModeProvider>
        <GlobalLayoutContent>{children}</GlobalLayoutContent>
      </DevModeProvider>
    </html>
  );
}
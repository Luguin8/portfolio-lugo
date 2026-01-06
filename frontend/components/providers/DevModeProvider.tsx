"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DevModeContextType {
    isDevMode: boolean;
    toggleDevMode: () => void;
    mousePos: { x: number; y: number };
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
    const [isDevMode, setIsDevMode] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const toggleDevMode = () => setIsDevMode(!isDevMode);

    useEffect(() => {
        // Solo rastreamos el mouse si el modo Dev está activo para ahorrar recursos
        const handleMouseMove = (e: MouseEvent) => {
            if (isDevMode) {
                setMousePos({ x: e.clientX, y: e.clientY }); // Usamos clientX/Y para coordenadas relativas a la ventana (fixed)
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isDevMode]);

    return (
        <DevModeContext.Provider value={{ isDevMode, toggleDevMode, mousePos }}>
            {children}
        </DevModeContext.Provider>
    );
}

export const useDevMode = () => {
    const context = useContext(DevModeContext);
    if (!context) throw new Error("useDevMode must be used within a DevModeProvider");
    return context;
};
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
        const handleMouseMove = (e: MouseEvent) => {
            // USAMOS pageX / pageY PARA QUE FUNCIONE CON EL SCROLL
            setMousePos({ x: e.pageX, y: e.pageY });
        };

        if (isDevMode) {
            window.addEventListener("mousemove", handleMouseMove);
        }
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
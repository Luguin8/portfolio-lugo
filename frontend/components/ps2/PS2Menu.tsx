"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { initPS2Audio, playPS2Hover, playPS2Confirm } from '@/lib/ps2Sounds';

const MENU_OPTIONS = [
    { id: 'sobre-mi', label: 'Sobre Mi', path: '/psxemu/about' },
    { id: 'proyectos', label: 'Proyectos', path: '/psxemu/memory' },
    { id: 'faqs', label: 'FAQs', path: '/psxemu/faqs' },
    { id: 'contact', label: 'Contact', path: '/psxemu/contact' }
];

export default function PS2Menu() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Initialize audio on click or keydown
        const initAudio = () => {
            initPS2Audio();
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
        window.addEventListener('click', initAudio);
        window.addEventListener('keydown', initAudio);
        return () => {
            window.removeEventListener('click', initAudio);
            window.removeEventListener('keydown', initAudio);
        };
    }, []);

    const handleSelect = useCallback((index: number | ((prev: number) => number)) => {
        playPS2Hover();
        setSelectedIndex(index);
    }, []);

    const handleConfirm = useCallback(() => {
        playPS2Confirm();
        const selectedOption = MENU_OPTIONS[selectedIndex];
        if (selectedOption.id === 'sobre-mi' || selectedOption.id === 'proyectos' || selectedOption.id === 'faqs') {
            router.push(selectedOption.path);
        } else {
            console.log(`Navigating to: ${selectedOption.path}`);
        }
    }, [selectedIndex, router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                handleSelect((prev: number) => (prev > 0 ? prev - 1 : MENU_OPTIONS.length - 1));
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                handleSelect((prev: number) => (prev < MENU_OPTIONS.length - 1 ? prev + 1 : 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                handleConfirm();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSelect, handleConfirm]);

    return (
        <>
            <div className="ps2-nav">
                {MENU_OPTIONS.map((option, index) => (
                    <div
                        key={option.id}
                        className={`ps2-item ${selectedIndex === index ? 'active' : ''}`}
                        onMouseEnter={() => handleSelect(index)}
                        onClick={() => handleConfirm()}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
            
            <div className="select-prompt">
                <div className="real-key-enter"><div className="key-surface">ENTER</div></div>
                <span>Seleccionar</span>
            </div>

            <div className="ps2-footer">
                <div className="footer-prompt">
                    <div className="keyboard-arrows">
                        <div className="real-key-square"><div className="key-surface-square">&#9650;</div></div>
                        <div className="real-key-square"><div className="key-surface-square">&#9660;</div></div>
                    </div>
                    <span>Navegar</span>
                </div>
            </div>
        </>
    );
}

"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { initPS2Audio, playPS2Hover, playPS2Confirm } from '@/lib/ps2Sounds';
import { PS2_TOPICS as TOPICS } from '@/lib/ps2About';

export default function PS2About() {
    const [index, setIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const cubes = document.querySelectorAll('#ps2-cubes .cube');
        cubes.forEach((el, i) => el.classList.toggle('active-cube', i === index));
    }, [index]);

    useEffect(() => {
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

    const move = useCallback((dir: 1 | -1) => {
        playPS2Hover();
        setIndex((prev) => (prev + dir + TOPICS.length) % TOPICS.length);
    }, []);

    const goBack = useCallback(() => {
        playPS2Confirm();
        router.push('/psxemu');
    }, [router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); move(1); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
            else if (e.key === 'Enter' || e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); goBack(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move, goBack]);

    const active = TOPICS[index];

    return (
        <>
            <div className="ps2-about-panel">
                <div className="ps2-title-yellow">{active.title}</div>
                <div className="ps2-text-cyan">{active.text}</div>
            </div>

            <div className="ps2-about-topics">
                {TOPICS.map((t, i) => (
                    <div key={t.title} className={`ps2-about-dot${i === index ? ' active' : ''}`} />
                ))}
            </div>

            <div className="browser-footer">
                <div className="browser-footer-center">
                    <div className="browser-footer-group">
                        <div className="real-key-enter"><div className="key-surface">BACKSPACE</div></div>
                        <span className="browser-prompt-text">Volver</span>
                    </div>
                    <div className="browser-footer-group">
                        <div className="keyboard-arrows" style={{ flexDirection: 'row' }}>
                            <div className="real-key-square"><div className="key-surface-square">&#9664;</div></div>
                            <div className="real-key-square"><div className="key-surface-square">&#9654;</div></div>
                        </div>
                        <span className="browser-prompt-text">Explorar</span>
                    </div>
                </div>
            </div>
        </>
    );
}

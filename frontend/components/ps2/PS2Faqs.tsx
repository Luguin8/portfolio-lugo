"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PS2_FAQS } from '@/lib/ps2Faqs';
import { initPS2Audio, playPS2Hover, playPS2Confirm } from '@/lib/ps2Sounds';

const COLUMNS = 4;

function MemoryCardFaces() {
    return (
        <div className="faq-mem-card">
            <div className="face front" />
            <div className="face back" />
            <div className="face left" />
            <div className="face right" />
            <div className="face top" />
            <div className="face bottom" />
        </div>
    );
}

export default function PS2Faqs() {
    const [index, setIndex] = useState(0);
    const router = useRouter();
    const total = PS2_FAQS.length;
    const active = PS2_FAQS[index];

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

    const move = useCallback((next: number) => {
        playPS2Hover();
        setIndex(((next % total) + total) % total);
    }, [total]);

    const goBack = useCallback(() => {
        playPS2Confirm();
        router.push('/psxemu');
    }, [router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); move(index + 1); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); move(index - 1); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); if (index + COLUMNS < total) move(index + COLUMNS); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); if (index - COLUMNS >= 0) move(index - COLUMNS); }
            else if (e.key === 'Backspace' || e.key === 'Escape') { e.preventDefault(); goBack(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [index, total, move, goBack]);

    return (
        <div className="faq-screen">
            <div className="faq-active-panel">
                <div className="faq-detail-q">{active.q}</div>
                <div className="faq-triangle" />
                <div className="faq-detail-a">{active.a}</div>
            </div>

            <div id="faq-grid">
                {PS2_FAQS.map((faq, i) => (
                    <div
                        key={faq.q}
                        className={`faq-item-wrap${i === index ? ' active' : ''}`}
                        onMouseEnter={() => move(i)}
                    >
                        <MemoryCardFaces />
                    </div>
                ))}
            </div>

            <div className="browser-footer">
                <div className="browser-footer-center">
                    <div className="browser-footer-group" id="faq-btn-back" onClick={goBack}>
                        <div className="real-key-enter"><div className="key-surface">BACKSPACE</div></div>
                        <span className="browser-prompt-text">Volver</span>
                    </div>
                    <div className="browser-footer-group">
                        <div className="keyboard-arrows" style={{ flexDirection: 'row' }}>
                            <div className="real-key-square"><div className="key-surface-square">&#9664;</div></div>
                            <div className="real-key-square"><div className="key-surface-square">&#9654;</div></div>
                        </div>
                        <span className="browser-prompt-text">Navegar</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

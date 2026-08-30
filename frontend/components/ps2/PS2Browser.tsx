"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PS2_PROJECTS } from '@/lib/ps2Projects';
import { initPS2Audio, playPS2Hover, playPS2Confirm } from '@/lib/ps2Sounds';

const COLUMNS = 6;

export default function PS2Browser() {
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailFocus, setDetailFocus] = useState<0 | 1>(0); // 0 = Launch, 1 = Back
    const router = useRouter();
    const total = PS2_PROJECTS.length;

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, []);

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

    const openDetail = useCallback(() => {
        playPS2Confirm();
        setDetailFocus(0);
        setDetailOpen(true);
    }, []);

    const closeDetail = useCallback(() => {
        playPS2Confirm();
        setDetailOpen(false);
    }, []);

    const goBackToMenu = useCallback(() => {
        playPS2Confirm();
        router.push('/psxemu');
    }, [router]);

    const launch = useCallback(() => {
        const project = PS2_PROJECTS[index];
        if (project.link) {
            playPS2Confirm();
            window.open(project.link, '_blank', 'noopener,noreferrer');
        }
    }, [index]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (loading) return;

            if (!detailOpen) {
                if (e.key === 'ArrowRight') { e.preventDefault(); move(index + 1); }
                else if (e.key === 'ArrowLeft') { e.preventDefault(); move(index - 1); }
                else if (e.key === 'ArrowDown') { e.preventDefault(); if (index + COLUMNS < total) move(index + COLUMNS); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); if (index - COLUMNS >= 0) move(index - COLUMNS); }
                else if (e.key === 'Enter') { e.preventDefault(); openDetail(); }
                else if (e.key === 'Backspace' || e.key === 'Escape') { e.preventDefault(); goBackToMenu(); }
            } else {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    playPS2Hover();
                    setDetailFocus((f) => (f === 0 ? 1 : 0));
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (detailFocus === 0) launch(); else closeDetail();
                } else if (e.key === 'Backspace' || e.key === 'Escape') {
                    e.preventDefault();
                    closeDetail();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [loading, detailOpen, detailFocus, index, total, move, openDetail, closeDetail, goBackToMenu, launch]);

    const active = PS2_PROJECTS[index];

    return (
        <div className="browser-screen">
            <div className="browser-header">
                <span>Portfolio (SYS)/1<br /><small>{total} Proyectos</small></span>
                <span id="browser-item-title">{active.title}</span>
            </div>

            {loading && <div id="browser-loading">Now Loading...</div>}

            {!loading && (
                <div className="browser-grid-container">
                    <div className="browser-grid">
                        {PS2_PROJECTS.map((p, i) => (
                            <div
                                key={p.id}
                                className={`browser-item-wrap scale-in${i === index ? ' active' : ''}`}
                                style={{ animationDelay: `${Math.min(i * 0.02, 0.4)}s` }}
                                onMouseEnter={() => move(i)}
                                onClick={() => { move(i); openDetail(); }}
                            >
                                <div className="browser-item-poly" style={{ animationDelay: `${(i % 6) * 0.4}s` }} />
                                <Image className="browser-item" src={p.image} alt={p.title} width={172} height={172} unoptimized />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {detailOpen && (
                <div className="browser-detail-overlay">
                    <div className="bd-card-wrap">
                        <div id="bd-card">
                            <Image id="bd-image" src={active.image} alt={active.title} width={400} height={400} unoptimized />
                        </div>
                    </div>
                    <div className="bd-info">
                        <div id="bd-title" className="bd-title-yellow">{active.title}</div>
                        <div className="bd-text-cyan">{active.tagline}</div>
                        <div className="bd-text-cyan-sm">{active.type} · {active.stack}</div>
                        <div id="bd-desc">{active.desc}</div>
                        <div className="bd-actions">
                            <div className={`bd-action ${detailFocus === 0 ? 'bd-detail-active' : 'bd-detail-inactive'}${!active.link ? ' bd-disabled' : ''}`}>
                                {active.link ? 'Launch Title' : 'Sin enlace público'}
                            </div>
                            <div className={`bd-action ${detailFocus === 1 ? 'bd-detail-active' : 'bd-detail-inactive'}`}>
                                Back
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="browser-footer">
                <div className="browser-footer-center">
                    <div className="browser-footer-group">
                        <div className="real-key-enter"><div className="key-surface">ENTER</div></div>
                        <span className="browser-prompt-text">{detailOpen ? 'Seleccionar' : 'Abrir'}</span>
                    </div>
                    <div className="browser-footer-group" onClick={detailOpen ? closeDetail : goBackToMenu}>
                        <div className="real-key-enter"><div className="key-surface">BACKSPACE</div></div>
                        <span className="browser-prompt-text">{detailOpen ? 'Cerrar' : 'Atrás'}</span>
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

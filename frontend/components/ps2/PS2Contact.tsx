"use client";

import React, { useActionState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaXTwitter, FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa6';
import { sendContactMessage } from '@/lib/actions';
import { initPS2Audio, playPS2Hover, playPS2Confirm } from '@/lib/ps2Sounds';

const SOCIALS = [
    { href: 'https://x.com/luuguin', label: 'X', icon: FaXTwitter },
    { href: 'https://linkedin.com/in/lugoamartin', label: 'LinkedIn', icon: FaLinkedin },
    { href: 'mailto:lugoamartin@gmail.com', label: 'Email', icon: FaEnvelope },
    { href: 'https://github.com/Luguin8', label: 'GitHub', icon: FaGithub },
];

const initialState = { success: false, message: '' };

export default function PS2Contact() {
    const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

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

    const goBack = useCallback(() => {
        playPS2Confirm();
        router.push('/psxemu');
    }, [router]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const tag = document.activeElement?.tagName;
            const typing = tag === 'INPUT' || tag === 'TEXTAREA';

            if ((e.key === 'Backspace' || e.key === 'Escape') && !typing) {
                e.preventDefault();
                goBack();
            } else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !typing) {
                e.preventDefault();
                playPS2Hover();
                const focusables = Array.from(
                    document.querySelectorAll<HTMLElement>('.social-icon, #contact-name, #contact-email, #contact-msg, .contact-submit-btn')
                );
                const current = focusables.indexOf(document.activeElement as HTMLElement);
                const next = e.key === 'ArrowDown'
                    ? Math.min(current + 1, focusables.length - 1)
                    : Math.max(current - 1, 0);
                focusables[next]?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goBack]);

    return (
        <div className="contact-screen">
            <div id="contact-container">
                <h1 className="contact-title">Contactame</h1>

                <div className="contact-socials">
                    {SOCIALS.map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto:') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label={label}
                            onMouseEnter={() => playPS2Hover()}
                            onClick={() => playPS2Confirm()}
                        >
                            <Icon size={32} />
                        </a>
                    ))}
                </div>

                <div className="contact-divider" />

                {state.success ? (
                    <p className="contact-success">{state.message || 'Mensaje enviado correctamente.'}</p>
                ) : (
                    <form ref={formRef} action={formAction} className="contact-form">
                        <input id="contact-name" name="name" className="contact-input" placeholder="Tu nombre" required />
                        <input id="contact-email" name="email" type="email" className="contact-input" placeholder="Tu email" required />
                        <textarea id="contact-msg" name="message" className="contact-input contact-textarea" placeholder="Mensaje" required />
                        {!state.success && state.message && (
                            <p className="contact-error">{state.message}</p>
                        )}
                        <button type="submit" className="contact-submit-btn" disabled={isPending}>
                            {isPending ? 'Enviando...' : 'Enviar Mensaje'}
                        </button>
                    </form>
                )}
            </div>

            <div id="contact-footer">
                <div className="select-prompt" onClick={goBack}>
                    <div className="real-key-enter"><div className="key-surface">BACKSPACE</div></div>
                    <span>Volver</span>
                </div>
            </div>
        </div>
    );
}

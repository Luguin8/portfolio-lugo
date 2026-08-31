"use client";

import React, { useActionState, useEffect } from "react";
import { FaXTwitter, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa6";
import { sendContactMessage } from "@/lib/actions";
import { initPS2Audio, playPS2Confirm } from "@/lib/ps2Sounds";
import PS2MobileShell from "./PS2MobileShell";

const SOCIALS = [
    { href: "https://x.com/luuguin", label: "X", icon: FaXTwitter },
    { href: "https://linkedin.com/in/lugoamartin", label: "LinkedIn", icon: FaLinkedin },
    { href: "mailto:lugoamartin@gmail.com", label: "Email", icon: FaEnvelope },
    { href: "https://github.com/Luguin8", label: "GitHub", icon: FaGithub },
];

const initialState = { success: false, message: "" };

export default function PS2MobileContact() {
    const [state, formAction, isPending] = useActionState(sendContactMessage, initialState);

    useEffect(() => {
        const init = () => {
            initPS2Audio();
            window.removeEventListener("pointerdown", init);
        };
        window.addEventListener("pointerdown", init);
        return () => window.removeEventListener("pointerdown", init);
    }, []);

    return (
        <PS2MobileShell title="Contacto">
            <div className="ps2m-contact">
                <h2>Contactame</h2>

                <div className="ps2m-contact-socials">
                    {SOCIALS.map(({ href, label, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            aria-label={label}
                            onClick={() => playPS2Confirm()}
                        >
                            <Icon size={26} />
                        </a>
                    ))}
                </div>

                <div className="ps2m-contact-divider" />

                {state.success ? (
                    <p className="ps2m-contact-msg ps2m-contact-ok">
                        {state.message || "Mensaje enviado correctamente."}
                    </p>
                ) : (
                    <form action={formAction}>
                        <input name="name" className="ps2m-input" placeholder="Tu nombre" required />
                        <input name="email" type="email" className="ps2m-input" placeholder="Tu email" required />
                        <textarea name="message" className="ps2m-input ps2m-textarea" placeholder="Mensaje" required />
                        {state.message && !state.success && (
                            <p className="ps2m-contact-msg ps2m-contact-err">{state.message}</p>
                        )}
                        <button type="submit" className="ps2m-submit" disabled={isPending}>
                            {isPending ? "Enviando..." : "Enviar Mensaje"}
                        </button>
                    </form>
                )}
            </div>
        </PS2MobileShell>
    );
}

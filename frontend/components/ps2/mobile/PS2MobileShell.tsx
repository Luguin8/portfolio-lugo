"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { playPS2Confirm } from "@/lib/ps2Sounds";

interface Props {
    title?: string;
    /** Where the ‹ back button goes. Defaults to the psxemu menu. */
    backHref?: string;
    onBack?: () => void;
    /** Hide the sticky top bar entirely (used by the menu, which only needs the LED). */
    bare?: boolean;
    children: ReactNode;
}

/**
 * Shared chrome for every touch /psxemu screen: CRT overlay, sticky top bar
 * with a real back button, and the red power LED that returns to the main site.
 */
export default function PS2MobileShell({ title, backHref = "/psxemu", onBack, bare = false, children }: Props) {
    const router = useRouter();

    const handleBack = () => {
        playPS2Confirm();
        if (onBack) onBack();
        else router.push(backHref);
    };

    return (
        <div className="ps2m-root ps2m-power-on">
            <div className="ps2m-crt" aria-hidden="true" />

            <Link href="/" className="ps2m-led" aria-label="Volver al portfolio principal" title="Volver al portfolio principal" />

            {!bare && (
                <div className="ps2m-topbar">
                    <button className="ps2m-back" onClick={handleBack} aria-label="Atrás">
                        <ChevronLeft size={22} />
                    </button>
                    {title && <h1>{title}</h1>}
                </div>
            )}

            {children}
        </div>
    );
}

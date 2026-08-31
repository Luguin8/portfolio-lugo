"use client";

import React, { useEffect, useState } from "react";
import { PS2_FAQS } from "@/lib/ps2Faqs";
import { initPS2Audio, playPS2Hover, playPS2Confirm } from "@/lib/ps2Sounds";
import PS2MobileShell from "./PS2MobileShell";

export default function PS2MobileFaqs() {
    const [open, setOpen] = useState<number | null>(0);

    useEffect(() => {
        const init = () => {
            initPS2Audio();
            window.removeEventListener("pointerdown", init);
        };
        window.addEventListener("pointerdown", init);
        return () => window.removeEventListener("pointerdown", init);
    }, []);

    return (
        <PS2MobileShell title="FAQs">
            <div className="ps2m-faq">
                {PS2_FAQS.map((f, i) => (
                    <div key={i} className="ps2m-faq-item">
                        <button
                            className="ps2m-faq-q"
                            onClick={() => {
                                if (open === i) { playPS2Hover(); setOpen(null); }
                                else { playPS2Confirm(); setOpen(i); }
                            }}
                            aria-expanded={open === i}
                        >
                            <span className="ps2m-faq-chip" aria-hidden="true" />
                            {f.q}
                        </button>
                        {open === i && <div className="ps2m-faq-a">{f.a}</div>}
                    </div>
                ))}
            </div>
        </PS2MobileShell>
    );
}

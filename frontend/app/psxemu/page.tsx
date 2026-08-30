"use client";

import React, { useEffect, useState } from 'react';
import PS2Environment from '@/components/ps2/PS2Environment';
import PS2Menu from '@/components/ps2/PS2Menu';
import PS2Boot3D from '@/components/ps2/PS2Boot3D';
import './ps2.css';

const BOOT_SESSION_KEY = 'psxemu-booted';

export default function PSXEmuPage() {
    // Only play the boot cinematic once per browser tab session, not every
    // time the user navigates back to the main menu from a sub-page.
    const [booted, setBooted] = useState(
        () => typeof window !== 'undefined' && sessionStorage.getItem(BOOT_SESSION_KEY) === '1'
    );

    useEffect(() => {
        // Prevent default scrolling on this page to act like an app
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleBootDone = () => {
        sessionStorage.setItem(BOOT_SESSION_KEY, '1');
        setBooted(true);
    };

    if (!booted) {
        return <PS2Boot3D onDone={handleBootDone} />;
    }

    return (
        <PS2Environment>
            <PS2Menu />
        </PS2Environment>
    );
}

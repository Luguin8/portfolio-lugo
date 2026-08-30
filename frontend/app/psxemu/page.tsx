"use client";

import React, { useEffect, useState } from 'react';
import PS2Environment from '@/components/ps2/PS2Environment';
import PS2Menu from '@/components/ps2/PS2Menu';
import PS2Boot3D from '@/components/ps2/PS2Boot3D';
import './ps2.css';

export default function PSXEmuPage() {
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        // Prevent default scrolling on this page to act like an app
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!booted) {
        return <PS2Boot3D onDone={() => setBooted(true)} />;
    }

    return (
        <PS2Environment>
            <PS2Menu />
        </PS2Environment>
    );
}

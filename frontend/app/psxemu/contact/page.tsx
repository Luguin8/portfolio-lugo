"use client";

import React, { useEffect } from 'react';
import PS2Canvas from '@/components/ps2/PS2Canvas';
import PS2Contact from '@/components/ps2/PS2Contact';
import '../ps2.css';

export default function PSXContactPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <PS2Canvas>
            <PS2Contact />
        </PS2Canvas>
    );
}

"use client";

import React, { useEffect } from 'react';
import PS2Environment from '@/components/ps2/PS2Environment';
import PS2About from '@/components/ps2/PS2About';
import '../ps2.css';

export default function PSXAboutPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <PS2Environment showCubes showCrystals aboutMode>
            <PS2About />
        </PS2Environment>
    );
}

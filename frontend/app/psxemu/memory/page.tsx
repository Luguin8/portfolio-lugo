"use client";

import React, { useEffect } from 'react';
import PS2Canvas from '@/components/ps2/PS2Canvas';
import PS2Browser from '@/components/ps2/PS2Browser';
import '../ps2.css';

export default function PSXProjectsPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <PS2Canvas>
            <PS2Browser />
        </PS2Canvas>
    );
}

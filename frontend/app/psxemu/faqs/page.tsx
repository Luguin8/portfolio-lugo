"use client";

import React, { useEffect } from 'react';
import PS2Canvas from '@/components/ps2/PS2Canvas';
import PS2Faqs from '@/components/ps2/PS2Faqs';
import '../ps2.css';

export default function PSXFaqsPage() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <PS2Canvas>
            <PS2Faqs />
        </PS2Canvas>
    );
}

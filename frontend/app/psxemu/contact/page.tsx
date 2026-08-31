"use client";

import React, { useEffect } from 'react';
import PS2Canvas from '@/components/ps2/PS2Canvas';
import PS2Contact from '@/components/ps2/PS2Contact';
import PS2MobileContact from '@/components/ps2/mobile/PS2MobileContact';
import { useIsMobile } from '@/lib/useIsMobile';
import '../ps2.css';
import '../ps2-mobile.css';

export default function PSXContactPage() {
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile]);

    if (isMobile === null) return <div className="ps2-boot3d" />;
    if (isMobile) return <PS2MobileContact />;

    return (
        <PS2Canvas>
            <PS2Contact />
        </PS2Canvas>
    );
}

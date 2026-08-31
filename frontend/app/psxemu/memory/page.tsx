"use client";

import React, { useEffect } from 'react';
import PS2Canvas from '@/components/ps2/PS2Canvas';
import PS2Browser from '@/components/ps2/PS2Browser';
import PS2MobileBrowser from '@/components/ps2/mobile/PS2MobileBrowser';
import { useIsMobile } from '@/lib/useIsMobile';
import '../ps2.css';
import '../ps2-mobile.css';

export default function PSXProjectsPage() {
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile]);

    if (isMobile === null) return <div className="ps2-boot3d" />;
    if (isMobile) return <PS2MobileBrowser />;

    return (
        <PS2Canvas>
            <PS2Browser />
        </PS2Canvas>
    );
}

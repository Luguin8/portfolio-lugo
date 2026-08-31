"use client";

import React, { useEffect } from 'react';
import PS2Environment from '@/components/ps2/PS2Environment';
import PS2About from '@/components/ps2/PS2About';
import PS2MobileAbout from '@/components/ps2/mobile/PS2MobileAbout';
import { useIsMobile } from '@/lib/useIsMobile';
import '../ps2.css';
import '../ps2-mobile.css';

export default function PSXAboutPage() {
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile]);

    if (isMobile === null) return <div className="ps2-boot3d" />;
    if (isMobile) return <PS2MobileAbout />;

    return (
        <PS2Environment showCubes showCrystals aboutMode>
            <PS2About />
        </PS2Environment>
    );
}

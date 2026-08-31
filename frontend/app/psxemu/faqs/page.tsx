"use client";

import React, { useEffect } from 'react';
import PS2Canvas from '@/components/ps2/PS2Canvas';
import PS2Faqs from '@/components/ps2/PS2Faqs';
import PS2MobileFaqs from '@/components/ps2/mobile/PS2MobileFaqs';
import { useIsMobile } from '@/lib/useIsMobile';
import '../ps2.css';
import '../ps2-mobile.css';

export default function PSXFaqsPage() {
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobile]);

    if (isMobile === null) return <div className="ps2-boot3d" />;
    if (isMobile) return <PS2MobileFaqs />;

    return (
        <PS2Canvas>
            <PS2Faqs />
        </PS2Canvas>
    );
}

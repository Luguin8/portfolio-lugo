"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/actions";

// Fires once per full page load (root layout mounts once per session in the
// App Router), skipping /admin so the owner's own visits aren't counted.
export default function VisitTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith("/admin")) return;
        trackVisit().catch(() => {});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

"use client";

import { useEffect, useState } from "react";

/**
 * Returns whether the current viewport should use the touch/mobile layout.
 * `null` until it resolves on the client — render a neutral placeholder for
 * that first frame so SSR and the first client render stay identical.
 */
export function useIsMobile(query = "(max-width: 820px)"): boolean | null {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const mql = window.matchMedia(query);
        const update = () => setIsMobile(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, [query]);

    return isMobile;
}

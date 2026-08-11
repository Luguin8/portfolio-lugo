const CORNER_CLASSES: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
};

// Decorative gothic corner flourishes — purely additive over the existing
// simple bb-corner-tr/bl marks, meant for high-emphasis frames (hero photo).
export default function OrnateFrame() {
    return (
        <>
            {Object.entries(CORNER_CLASSES).map(([corner, cls]) => (
                <svg
                    key={corner}
                    className={`absolute w-12 h-12 pointer-events-none ${cls}`}
                    viewBox="0 0 48 48"
                    fill="none"
                    aria-hidden="true"
                >
                    <path d="M2 2 L2 26 Q2 34 10 34" stroke="var(--bb-gold-dim)" strokeWidth="1" />
                    <path d="M2 2 L26 2 Q34 2 34 10" stroke="var(--bb-gold-dim)" strokeWidth="1" />
                    <path d="M10 10 Q16 10 16 16 Q16 22 10 22" stroke="var(--bb-gold-dim)" strokeWidth="0.75" opacity="0.6" />
                    <circle cx="2" cy="2" r="2" fill="var(--bb-gold)" />
                </svg>
            ))}
        </>
    );
}

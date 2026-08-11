import Link from "next/link";

export default function NotFound() {
    return (
        <main
            className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
            style={{ background: "var(--bb-bg)" }}
        >
            <div className="relative z-10 text-center max-w-lg">
                <p className="text-xs tracking-[0.4em] uppercase mb-6 font-title text-bb-muted">
                    ✦ &nbsp; ERROR 404 &nbsp; ✦
                </p>
                <h1
                    className="text-6xl md:text-8xl mb-6 font-title"
                    style={{
                        color: "var(--bb-crimson)",
                        letterSpacing: "0.08em",
                        textShadow: "0 0 24px rgba(139, 26, 26, 0.55), 0 0 60px rgba(139, 26, 26, 0.22)",
                    }}
                >
                    HAS MUERTO
                </h1>
                <div className="bb-separator mb-8 mx-auto" style={{ maxWidth: "320px" }} />
                <p className="text-base leading-relaxed font-body italic text-bb-muted mb-10">
                    La página que buscabas no existe en este mundo, o fue consumida por la niebla.
                </p>
                <Link href="/" className="bb-btn">
                    Volver al Sueño del Cazador
                </Link>
            </div>
        </main>
    );
}

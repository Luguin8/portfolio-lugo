// Sandbox route for the console-boot redesign. Nothing here touches
// the live site (app/page.tsx) — this is where we build and preview
// the new pieces in place before anything gets promoted to main.
export default function PsxPreviewPage() {
    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#020a1f",
                color: "#8496bf",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
            }}
        >
            /psxpreview — sin avance todavía
        </main>
    );
}

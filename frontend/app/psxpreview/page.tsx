import Scene from "@/components/psxpreview/Scene";
import MenuOverlay from "@/components/psxpreview/MenuOverlay";

// Sandbox route for the console-boot redesign. Nothing here touches
// the live site (app/page.tsx) — this is where we build and preview
// the new pieces in place before anything gets promoted to main.
export default function PsxPreviewPage() {
    return (
        <main className="relative h-screen w-screen overflow-hidden bg-black">
            <Scene />
            <MenuOverlay />
        </main>
    );
}

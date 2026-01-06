import type { Metadata } from "next";
import "./globals.css";
import { DevModeProvider } from "@/components/providers/DevModeProvider";

export const metadata: Metadata = {
  title: "LugoDev | Full Stack Architect",
  description: "Portfolio profesional de Lugo Martin Adrian - Python & React Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-background text-foreground">
        {/* Envolvemos toda la app en el Provider */}
        <DevModeProvider>
          {children}
        </DevModeProvider>
      </body>
    </html>
  );
}
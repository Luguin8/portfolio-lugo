import type { Metadata } from "next";
import "./globals.css";
import { DevModeProvider } from "@/components/providers/DevModeProvider";

// Importamos la fuente Inter (o la que uses)
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Lugo Martin | Full Stack Portfolio",
  description: "Desarrollador Full Stack Python & React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${mono.variable}`}>
      {/* Agregamos la clase glitch-effect aquí */}
      <body className="antialiased bg-[#121212] text-white glitch-effect overflow-x-hidden">
        <DevModeProvider>
          {children}
        </DevModeProvider>
      </body>
    </html>
  );
}
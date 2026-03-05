import type { Metadata } from "next";
import { Cinzel, EB_Garamond } from "next/font/google";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lugo Martin | Full Stack Architect",
  description: "Portfolio profesional de Lugo Martin. Desarrollador Full Stack.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <ClientLayout fontVariables={`${cinzel.variable} ${ebGaramond.variable}`}>
        {children}
      </ClientLayout>
    </html>
  );
}
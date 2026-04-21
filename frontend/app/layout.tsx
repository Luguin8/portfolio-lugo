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
  description: "Portfolio profesional de Lugo Martin. Desarrollador Full Stack, Mobile, Data y Automatización.",
  openGraph: {
    title: "Lugo Martin | Full Stack Architect",
    description: "Portfolio profesional de Lugo Martin. Desarrollador Full Stack, Mobile, Data y Automatización.",
    url: "https://lugomartin.com",
    siteName: "Lugo Martin Portfolio",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lugo Martin | Full Stack Architect",
    description: "Portfolio profesional de Lugo Martin. Desarrollador Full Stack, Mobile, Data y Automatización.",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lugo Martin",
    jobTitle: "Full Stack Developer",
    url: "https://lugomartin.com",
    sameAs: [
      "https://github.com/Luquin8",
      "https://linkedin.com/in/lugoamartin"
    ]
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <ClientLayout fontVariables={`${cinzel.variable} ${ebGaramond.variable}`}>
        {children}
      </ClientLayout>
    </html>
  );
}
import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

// ─── Fuentes ─────────────────────────────────────────────
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ─── Metadata base (SEO) ──────────────────────────────────
// TODO: reemplaza con tus datos reales
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msolla.dev";
const FULL_NAME = "Miguel Solla";
const TITLE     = `${FULL_NAME} — Fullstack Developer`;
const DESC      = "Fullstack developer con más de 13 años de experiencia profesional construyendo productos web que escalan. React, Next.js, Node.js, arquitecturas modernas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DESC,
  keywords: [
    "fullstack developer",
    "desarrollador web freelance",
    "React developer",
    "Next.js developer",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: FULL_NAME,
    title: TITLE,
    description: DESC,
    images: [
      {
        url: "/og-image.png",   // genera con @vercel/og o Satori
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ─── Schema JSON-LD ──────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  url: SITE_URL,
  jobTitle: "Fullstack Developer",
  description: DESC,
  sameAs: [
    //"https://github.com/msolladev",      // TODO
    "https://www.linkedin.com/in/miguel-solla/",
  ],
};

// ─── Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Efecto grain sobre toda la web */}
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

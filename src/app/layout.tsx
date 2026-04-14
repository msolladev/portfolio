import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { yearsOfExperience } from "@/lib/yearsOfExperience";
import { Providers } from "@/components/layout/Providers";

// ─── Fuentes ─────────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

// ─── Metadata base (SEO) ──────────────────────────────────
// TODO: reemplaza con tus datos reales
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://msolla.dev";
const FULL_NAME = "Miguel Solla";
const TITLE = `${FULL_NAME} — Fullstack Developer`;
const DESC = `Desarrollador web fullstack con más de ${yearsOfExperience} años de experiencia profesional. Especializado en PHP, Laravel y WordPress, con experiencia en Android y .NET Core. Actualmente explorando el ecosistema Node.js. Construyo software que funciona, escala y es fácil de mantener.`;


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${FULL_NAME}`,
  },
  description: DESC,
  keywords: [
    "Miguel Solla",
    "msolla",
    "fullstack developer",
    "desarrollador web",
    "programador web",
    "desarrollador PHP",
    "programador PHP",
    "Laravel developer",
    "WordPress developer",
    "desarrollador freelance",
    "desarrollador remoto",
    "Alcalá de Henares",
    "Madrid",
    "Madrid este",
    "Node.js",
    "NestJS",
    "Android developer",
    ".NET Core",
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
        url: "/img/og-image.png",   // genera con @vercel/og o Satori
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
    images: ["/img/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/img/favicon/favicon.ico",
    apple: "/img/favicon/apple-touch-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
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
    <html lang="es" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Efecto grain sobre toda la web */}
        <div className="grain" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

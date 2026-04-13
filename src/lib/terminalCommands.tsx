import { yearsOfExperience } from "@/lib/yearsOfExperience";

// ─── Command definitions ──────────────────────────────────
export const COMMANDS: Record<string, string[]> = {
  help: [
    "Comandos disponibles:",
    "  whoami      → quién soy",
    "  skills      → stack tecnológico",
    "  experience  → trayectoria profesional",
    "  education   → formación",
    "  contact     → cómo contactarme",
    "  clear       → limpiar terminal",
    "  now         → qué estoy haciendo ahora",
  ],
  whoami: [
    "Miguel Solla — Fullstack Developer",
    `${yearsOfExperience} años construyendo productos reales.`,
    "Backend sólido en PHP y Laravel, con experiencia en Android y .NET Core.",
    "Actualmente explorando el ecosistema Node.js.",
    "Me interesa tanto la arquitectura como el impacto real del software.",
  ],
  skills: [
    "Backend:    PHP · Laravel · Symfony · CakePHP · .NET Core",
    "CMS/Ecomm: WordPress · PrestaShop · WooCommerce",
    "Frontend:   Bootstrap · jQuery · HTML5 · CSS3",
    "Mobile:     Android (Java + Kotlin)",
    "Infra:      Git · Docker · Linux · Nginx",
    "Aprendiendo: Node.js · NestJS · React · Next.js · Vue · PostgreSQL",
  ],
  experience: [
    "2012 → hoy   Extra Software — Senior Developer",
    "             WordPress, PrestaShop, Laravel, Android, .NET Core",
    "             Consultoría y proyectos para múltiples clientes",
    "",
    "2023 → hoy   HWI Group — Senior Developer",
    "             Arquitectura e implantación de plataforma web",
    "             ERP para correduría de seguros",
  ],
  education: [
    "2012  CFGS Desarrollo de Aplicaciones Informáticas — IES Teide IV",
    "2009  CFGM Explotación de Sistemas Informáticos — IES Teide IV",
    "2018  Máster Executive Diseño y Programación Web 3.0 — U. Nebrija",
    "2016  Desarrollo Apps Web, Android e iOS — INEM",
    "2013  Desarrollo de Aplicaciones Android — Teide IV / INEM",
  ],
  now: [
    "Estado actual:",
    "",
    "  Trabajando en:  Plataforma ERP para correduría de seguros",
    "  Aprendiendo:    Node.js · NestJS · React · Next.js",
    "  Abierto a:      Posición fullstack en remoto o híbrido (Alcalá de Henares)",
    "",
    "  → msolla.dev/contacto",
  ],
  contact: [
    "LinkedIn: linkedin.com/in/miguel-solla",
    "Web:      msolla.dev/contacto",
    "",
    "¿Tienes una oportunidad interesante? → msolla.dev/contacto · linkedin.com/in/miguel-solla",
  ],
};

// ─── Render utility ───────────────────────────────────────
const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*)/g;

export function renderLine(text: string): React.ReactNode[] {
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith("http") ? part : `https://${part}`;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", textDecoration: "underline" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

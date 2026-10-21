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
    "Miguel Solla — Senior Backend Developer PHP/Laravel",
    "LLMs y desarrollo con agentes de IA (Claude Code).",
    "Me interesa tanto la arquitectura como el impacto real del software.",
  ],
  skills: [
    "Backend:  PHP · Laravel · Symfony · CakePHP",
    "Datos:    MariaDB · MySQL · optimización SQL",
    "IA:       Claude Code · LLMs · ingeniería de prompts",
    "Infra:    Git · Docker · GitHub Actions (CI/CD) · Linux · Nginx",
  ],
  experience: [
    "2023 → hoy    Dubois Group (antes HW International) — Senior Backend Developer PHP · IA aplicada",
    "              Plataforma de gestión del sector seguros en evolución hacia un ERP",
    "              LLMs para extracción de datos y flujo de desarrollo con Claude Code",
    "",
    "2012 → 2023   Extra Software — Senior Developer",
    "              Consultoría: proyectos PHP, Laravel y Symfony para múltiples clientes",
  ],
  education: [
    "2012  CFGS Desarrollo de Aplicaciones Informáticas — IES Teide IV",
    "2009  CFGM Explotación de Sistemas Informáticos — IES Teide IV",
    "2018  Máster Executive Diseño y Programación Web 3.0 — U. Nebrija",
  ],
  now: [
    "Estado actual:",
    "",
    "  Trabajando en:  plataforma de gestión del sector seguros (PHP, IA aplicada)",
    "  Explorando:     specs, ADRs y hooks con Claude Code en un proyecto personal en Laravel",
    "  Abierto a:      puesto senior backend con IA, en remoto o híbrido cerca de Alcalá de Henares",
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

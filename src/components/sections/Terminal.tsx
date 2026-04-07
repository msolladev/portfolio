"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { yearsOfExperience } from "@/lib/yearsOfExperience";

// ─── Comandos disponibles ─────────────────────────────────
type Line = { type: "input" | "output" | "error"; text: string };

const PROMPT = "visitor@portfolio:~$";

export function Terminal() {
  const COMMANDS: Record<string, string[]> = {
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

  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text:
        'Conectado como visitor@msolla.dev — Escribe "help" para ver los comandos disponibles.',
    },
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const NAVBAR_OFFSET = 70;

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [
      ...lines,
      { type: "input", text: `${PROMPT} ${cmd}` },
    ];

    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([
        {
          type: "output",
          text: 'Terminal limpiada. Escribe "help" para empezar.',
        },
      ]);
      setInput("");
      return;
    }

    const result = COMMANDS[cmd];
    if (result) {
      result.forEach((t) =>
        newLines.push({ type: "output", text: t })
      );
    } else {
      newLines.push({
        type: "error",
        text: `Comando no encontrado: ${cmd}. Prueba con "help".`,
      });
    }

    setLines(newLines);
    setInput("");

    requestAnimationFrame(() => {
      // Scroll interno (como siempre)
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });

      // Scroll de window CONTROLADO (independiente del viewport)
      if (terminalRef.current) {
        const top =
          terminalRef.current.getBoundingClientRect().top +
          window.scrollY -
          NAVBAR_OFFSET;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    });
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      return;
    }
    if (e.key === "ArrowUp") {
      const idx = histIdx + 1;
      if (idx < history.length) {
        setHistIdx(idx);
        setInput(history[idx]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      const idx = histIdx - 1;
      if (idx < 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  };

  function renderLine(text: string) {
    const urlRegex =
      /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\/[^\s]*)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        const href = part.startsWith("http")
          ? part
          : `https://${part}`;
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--accent)",
              textDecoration: "underline",
            }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  }

  return (
    <section className="page-content">
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--text-soft)",
          marginBottom: "1rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        — Terminal interactiva
      </p>

      <motion.div
        ref={terminalRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        onClick={() => inputRef.current?.focus()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          overflow: "hidden",
          cursor: "text",
          maxHeight: "420px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            padding: "0.75rem 1rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
          ))}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-soft)",
              marginLeft: "auto",
            }}
          >
            bash — portfolio
          </span>
        </div>

        {/* Output */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            overflowY: "auto",
            flex: 1,
            fontFamily: "var(--font-mono)",
            fontSize: "0.875rem",
            lineHeight: 1.7,
          }}
        >
          <AnimatePresence initial={false}>
            {lines.map((line, i) => (
              <motion.div
                suppressHydrationWarning
                className="terminal-line"
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  color:
                    line.type === "input"
                      ? "var(--accent)"
                      : line.type === "error"
                        ? "#ff5f57"
                        : "var(--text-soft)",
                  whiteSpace: "pre",
                }}
              >
                {renderLine(line.text)}
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={bottomRef} />

          {/* Input row */}
          <div style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }}>
            <span style={{ color: "var(--accent)", marginRight: "0.5rem", flexShrink: 0 }}>
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                flex: 1,
                caretColor: "var(--accent)",
              }}
            />
            <span className="terminal-cursor" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
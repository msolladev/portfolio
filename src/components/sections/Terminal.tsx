"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Comandos disponibles ─────────────────────────────────
type Line = { type: "input" | "output" | "error"; text: string };

const COMMANDS: Record<string, string[]> = {
  help: [
    "Comandos disponibles:",
    "  whoami      → quién soy",
    "  skills      → stack tecnológico",
    "  experience  → resumen de experiencia",
    "  contact     → cómo contactarme",
    "  clear       → limpiar terminal",
  ],
  whoami: [
    "Miguel Solla — Fullstack Developer",
    "13 años construyendo productos reales.",
    "Especializado en React, Next.js y Node.js.",
    "Me interesa la arquitectura tanto como el pixel.",
  ],
  skills: [
    "Frontend:   React · Next.js · TypeScript · Framer Motion",
    "Backend:    Node.js · Express · NestJS · tRPC",
    "Data:       PostgreSQL · Redis · Prisma · Drizzle",
    "Infra:      Docker · Nginx · GitHub Actions · Linux",
    "Craft:      Testing · Clean Code · Performance · SEO",
  ],
  experience: [
    "2012 → 2016   Junior / Mid — agencias y startups",
    "2016 → 2020   Senior — productos SaaS B2B",
    "2020 → 2024   Lead / Arquitecto — equipos de 6-12 devs",
    "2024 → hoy    Freelance — proyectos de alto impacto",
  ],
  contact: [
    "Email:    hola@tunombre.dev",
    "LinkedIn: linkedin.com/in/tuusuario",
    "GitHub:   github.com/tuusuario",
    "",
    "¿Tienes un proyecto? → /contacto",
  ],
};

const PROMPT = "visitor@portfolio:~$";

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Bienvenido. Escribe "help" para empezar.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [...lines, { type: "input", text: `${PROMPT} ${cmd}` }];
    setHistory((h) => [cmd, ...h]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setLines([{ type: "output", text: 'Terminal limpiada. Escribe "help" para empezar.' }]);
      setInput("");
      return;
    }

    const result = COMMANDS[cmd];
    if (result) {
      result.forEach((t) => newLines.push({ type: "output", text: t }));
    } else {
      newLines.push({
        type: "error",
        text: `Comando no encontrado: ${cmd}. Prueba con "help".`,
      });
    }

    setLines(newLines);
    setInput("");
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { run(input); return; }
    if (e.key === "ArrowUp") {
      const idx = histIdx + 1;
      if (idx < history.length) { setHistIdx(idx); setInput(history[idx]); }
      return;
    }
    if (e.key === "ArrowDown") {
      const idx = histIdx - 1;
      if (idx < 0) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(idx); setInput(history[idx]); }
    }
  };

  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
      }}
    >
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
          {["#ff5f57","#febc2e","#28c840"].map((c) => (
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
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  color:
                    line.type === "input"  ? "var(--accent)"   :
                    line.type === "error"  ? "#ff5f57"          :
                    "var(--text-soft)",
                  whiteSpace: "pre",
                }}
              >
                {line.text || "\u00A0"}
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

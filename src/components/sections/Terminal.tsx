"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMMANDS, renderLine } from "@/lib/terminalCommands";
import { NAVBAR_HEIGHT } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────
type Line = { type: "input" | "output" | "error"; text: string };

const PROMPT = "visitor@portfolio:~$";

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: 'Conectado como visitor@msolla.dev — Escribe "help" para ver los comandos disponibles.',
    },
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      result.forEach((t) => newLines.push({ type: "output", text: t }));
    } else {
      newLines.push({
        type: "error",
        text: `Comando no encontrado: ${cmd}. Prueba con "help".`,
      });
    }

    setLines(newLines);
    setInput("");

    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });

      if (terminalRef.current) {
        const top =
          terminalRef.current.getBoundingClientRect().top +
          window.scrollY -
          NAVBAR_HEIGHT;

        window.scrollTo({ top, behavior: "smooth" });
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

  return (
    <section style={{ position: "relative" }}>
      <p className="section-label" style={{ marginBottom: "1.25rem" }}>
        — Terminal interactiva
      </p>

      <motion.div
        ref={terminalRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={() => inputRef.current?.focus()}
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "text",
          maxHeight: "420px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* Window chrome */}
        <div
          style={{
            padding: "0.75rem 1rem",
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          {(["--mac-close", "--mac-minimize", "--mac-maximize"] as const).map((v) => (
            <div
              key={v}
              style={{ width: 12, height: 12, borderRadius: "50%", background: `var(${v})` }}
            />
          ))}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-soft)",
              marginLeft: "auto",
              letterSpacing: "0.04em",
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
            background: "var(--bg)",
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
                        ? "var(--color-error)"
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

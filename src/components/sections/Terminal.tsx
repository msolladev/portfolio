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
    <section>
      <p className="section-label mb-4">— Terminal interactiva</p>

      <motion.div
        ref={terminalRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        onClick={() => inputRef.current?.focus()}
        className="bg-[var(--surface)] border border-[var(--border)] rounded-[10px] overflow-hidden cursor-text max-h-[420px] flex flex-col"
      >
        {/* Window chrome */}
        <div className="px-4 py-3 border-b border-[var(--border)] flex items-center gap-2 shrink-0">
          {(["--mac-close", "--mac-minimize", "--mac-maximize"] as const).map((v) => (
            <div
              key={v}
              className="w-3 h-3 rounded-full"
              style={{ background: `var(${v})` }}
            />
          ))}
          <span className="font-mono text-[0.75rem] text-[var(--text-soft)] ml-auto">
            bash — portfolio
          </span>
        </div>

        {/* Output */}
        <div className="px-6 py-5 overflow-y-auto flex-1 font-mono text-[0.875rem] leading-[1.7]">
          <AnimatePresence initial={false}>
            {lines.map((line, i) => (
              <motion.div
                suppressHydrationWarning
                className={`terminal-line whitespace-pre ${
                  line.type === "input"
                    ? "text-[var(--accent)]"
                    : line.type === "error"
                    ? "text-[var(--color-error)]"
                    : "text-[var(--text-soft)]"
                }`}
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
              >
                {renderLine(line.text)}
              </motion.div>
            ))}
          </AnimatePresence>

          <div ref={bottomRef} />

          {/* Input row */}
          <div className="flex items-center mt-1">
            <span className="text-[var(--accent)] mr-2 shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
              className="bg-transparent border-none outline-none text-[var(--text)] font-mono text-[0.875rem] flex-1 caret-[var(--accent)]"
            />
            <span className="terminal-cursor" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { yearsOfExperience } from "@/lib/yearsOfExperience";

const ease = [0.25, 0.1, 0.25, 1] as const;

const STATS = [
  { number: `${yearsOfExperience}+`, label: "años de experiencia", hydrate: true },
  { number: "100+",                  label: "proyectos entregados", hydrate: false },
  { number: "5",                     label: "stacks dominados",     hydrate: false },
];

export function StatStrip() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      aria-label="Estadísticas profesionales"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        margin: "0 0 2.5rem",
      }}
    >
      {/* Desktop: horizontal row */}
      <div
        className="hidden sm:flex"
        style={{ alignItems: "stretch" }}
      >
        {STATS.map(({ number, label, hydrate }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem 1.5rem",
              borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
              gap: "0.35rem",
            }}
          >
            <span
              suppressHydrationWarning={hydrate}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "var(--accent)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              {number}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-soft)",
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col sm:hidden">
        {STATS.map(({ number, label, hydrate }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.45, ease }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1.25rem 1.5rem",
              borderBottom: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <span
              suppressHydrationWarning={hydrate}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "2rem",
                color: "var(--accent)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                minWidth: "3.5rem",
              }}
            >
              {number}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-soft)",
              }}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

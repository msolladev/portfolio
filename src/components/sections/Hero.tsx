"use client";

import { yearsOfExperience } from "@/lib/yearsOfExperience";
import { motion } from "framer-motion";
import Link from "next/link";

const WORDS = ["escalan.", "perduran.", "importan."];

export function Hero() {
  return (
    <section className="page-content">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          color: "var(--accent)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        Fullstack Developer · {yearsOfExperience} años de experiencia
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          fontSize: "clamp(2.8rem, 7vw, 6rem)",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          marginBottom: "2rem",
          maxWidth: "14ch",
        }}
      >
        Construyo soluciones que{" "}
        <RotatingWord words={WORDS} />
      </motion.h1>

      {/* Subline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        style={{
          fontSize: "1.15rem",
          color: "var(--text-soft)",
          maxWidth: "52ch",
          marginBottom: "3rem",
          lineHeight: 1.6,
        }}
      >
        PHP · Laravel · WordPress y ecosistema frontend clásico.
        {yearsOfExperience} años construyendo productos reales. Transicionando hacia Node.js.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
      >
        <Link
          href="/sobre-mi"
          style={{
            padding: "0.75rem 1.75rem",
            background: "var(--accent)",
            color: "var(--bg)",
            fontWeight: 700,
            fontSize: "0.9rem",
            borderRadius: "var(--radius)",
            letterSpacing: "0.02em",
            transition: "opacity var(--transition)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Sobre mí →
        </Link>
        <Link
          href="/contacto"
          style={{
            padding: "0.75rem 1.75rem",
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: "var(--radius)",
            transition: "border-color var(--transition)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          Hablemos
        </Link>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          marginTop: "auto",
          paddingTop: "4rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--text-soft)",
        }}
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Rotating word component ──────────────────────────────
function RotatingWord({ words }: { words: string[] }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          style={{
            color: "var(--accent)",
            position: i === 0 ? "relative" : "absolute",
            left: 0,
            top: 0,
            display: "block",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
          transition={{
            duration: 3,
            delay: i * 3,
            repeat: Infinity,
            repeatDelay: (words.length - 1) * 3,
            times: [0, 0.15, 0.85, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

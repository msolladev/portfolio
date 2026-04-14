"use client";

import { yearsOfExperience } from "@/lib/yearsOfExperience";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const WORDS = ["escalan.", "perduran.", "importan."];
const ease = [0.25, 0.1, 0.25, 1] as const;

export function Hero() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-[1fr_260px] sm:gap-10 sm:items-center pt-16 pb-24 relative">

      {/* ── Left column ── */}
      <div className="flex flex-col">

        {/* Eyebrow */}
        <motion.p
          suppressHydrationWarning
          className="eyebrow mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
        >
          Fullstack Developer · {yearsOfExperience} años de experiencia
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-display font-extrabold leading-[1.05] tracking-[-0.03em] mb-6 text-[var(--text)]"
          style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
        >
          Construyo soluciones que{" "}
          <RotatingWord words={WORDS} />
        </motion.h1>

        {/* Subline */}
        <motion.p
          suppressHydrationWarning
          className="text-[1.05rem] text-[var(--text-soft)] leading-[1.65] mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease }}
        >
          PHP · Laravel · WordPress y ecosistema frontend clásico.{" "}
          {yearsOfExperience} años construyendo productos reales. Transicionando hacia Node.js.
        </motion.p>

        {/* Typographic breath mark */}
        <motion.div
          className="w-12 h-px bg-[var(--border)] mb-7 origin-left"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.42, duration: 0.5, ease }}
        />

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
        >
          <Link href="/sobre-mi" className="btn-primary">
            Sobre mí <span className="btn-arrow">→</span>
          </Link>
          <Link href="/contacto" className="btn-secondary">
            Hablemos
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex items-center gap-[0.6rem] font-mono text-[0.75rem] text-[var(--text-soft)] mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span>scroll</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>

      {/* ── Right column — decorative ── */}
      <motion.div
        className="hidden sm:flex flex-col items-center justify-center border-l border-[var(--border)] h-full min-h-[240px] gap-4"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[var(--accent)] shrink-0 shadow-[0_0_0_4px_var(--accent-glow)]">
          <Image
            src="/img/avatar.jpg"
            alt="Miguel Solla"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <span className="font-mono text-[0.7rem] tracking-[0.12em] uppercase text-[var(--text-soft)] opacity-50 text-center">
          2012 — 2026
        </span>
      </motion.div>
    </section>
  );
}

/* ─── Rotating word ─────────────────────────────────────── */
function RotatingWord({ words }: { words: string[] }) {
  return (
    <span className="relative inline-block">
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="font-display text-[var(--accent)] block"
          style={{ position: i === 0 ? "relative" : "absolute", left: 0, top: 0 }}
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

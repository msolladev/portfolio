"use client";

import { motion } from "framer-motion";

export function Stack() {
  const STACK: { label: string; years?: string }[] = [
    { label: "PHP" },
    { label: "Laravel" },
    { label: "Symfony" },
    { label: "MariaDB / MySQL" },
    { label: "Optimización SQL" },
    { label: "Docker" },
    { label: "Git y GitHub Actions (CI/CD)" },
    { label: "Claude Code" },
    { label: "LLMs (extracción y clasificación de datos)" },
  ];

  return (
    <section>
      <p className="section-label mb-8">— Stack principal</p>

      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}>
        {STACK.map(({ label, years }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card stack-card p-4 cursor-default"
          >
            <p className={`font-bold text-[1rem]${years ? " mb-1" : ""}`}>{label}</p>
            {years && (
              <p suppressHydrationWarning className="text-[0.78rem] text-[var(--text-soft)] font-mono">
                {years}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

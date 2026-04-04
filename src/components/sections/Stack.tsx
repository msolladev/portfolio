"use client";

import { motion } from "framer-motion";

const STACK = [
  { label: "React",       years: "9 años"  },
  { label: "Next.js",     years: "5 años"  },
  { label: "TypeScript",  years: "7 años"  },
  { label: "Node.js",     years: "11 años" },
  { label: "PostgreSQL",  years: "10 años" },
  { label: "Docker",      years: "8 años"  },
  { label: "Redis",       years: "7 años"  },
  { label: "Linux",       years: "13 años" },
];

export function Stack() {
  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem 1.5rem 8rem",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--text-soft)",
          marginBottom: "2rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        — Stack principal
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "1rem",
        }}
      >
        {STACK.map(({ label, years }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ borderColor: "var(--accent)", scale: 1.02 }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1rem 1.25rem",
              cursor: "default",
              transition: "border-color var(--transition)",
            }}
          >
            <p style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>
              {label}
            </p>
            <p style={{ fontSize: "0.78rem", color: "var(--text-soft)", fontFamily: "var(--font-mono)" }}>
              {years}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

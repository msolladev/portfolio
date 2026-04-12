"use client";

import { yearsOfExperience } from "@/lib/yearsOfExperience";
import { motion } from "framer-motion";

export function Stack() {
  const STACK = [
    { label: "PHP",                  years: `${yearsOfExperience} años` },
    { label: "MySQL / MariaDB",      years: `${yearsOfExperience} años` },
    { label: "Laravel",              years: "7 años"                    },
    { label: "WordPress",            years: "6 años"                    },
    { label: "Bootstrap / jQuery",   years: `${yearsOfExperience} años` },
    { label: "Symfony / CakePHP",    years: "5 años"                    },
    { label: "Prestashop",           years: "4 años"                    },
    { label: "Android (Java/Kotlin + XML)",years: "3 años"                    },
    { label: ".NET Core",            years: "4 años"                    },
    { label: "NestJS / React / Next.js / Vue", years: "Aprendizaje activo" },
    { label: "PostgreSQL",           years: "Aprendizaje activo"        },
    { label: "SwiftUI",              years: "Exploración puntual"       },
  ];

  return (
    <section className="">
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
        className="stack-grid"
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
            <p suppressHydrationWarning style={{ fontSize: "0.78rem", color: "var(--text-soft)", fontFamily: "var(--font-mono)" }}>
              {years}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

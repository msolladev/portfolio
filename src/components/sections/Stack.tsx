"use client";

import { yearsOfExperience } from "@/lib/yearsOfExperience";
import { motion } from "framer-motion";

export function Stack() {
  const STACK = [
    { label: "PHP",                               years: `${yearsOfExperience} años` },
    { label: "MySQL / MariaDB",                   years: `${yearsOfExperience} años` },
    { label: "Laravel",                           years: "7 años"                    },
    { label: "WordPress",                         years: "6 años"                    },
    { label: "Bootstrap / jQuery",                years: `${yearsOfExperience} años` },
    { label: "Symfony / CakePHP",                 years: "5 años"                    },
    { label: "Prestashop",                        years: "4 años"                    },
    { label: "Android (Java/Kotlin + XML)",        years: "3 años"                    },
    { label: ".NET Core",                         years: "4 años"                    },
    { label: "NestJS / React / Next.js / Vue",    years: "Aprendizaje activo"        },
    { label: "PostgreSQL",                        years: "Aprendizaje activo"        },
    { label: "SwiftUI",                           years: "Exploración puntual"       },
  ];

  const isActive = (years: string) =>
    years === "Aprendizaje activo" || years === "Exploración puntual";

  return (
    <section>
      <p className="section-label" style={{ marginBottom: "2rem" }}>
        — Stack principal
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))",
          gap: "0.875rem",
        }}
      >
        {STACK.map(({ label, years }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1rem 1.25rem",
              cursor: "default",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 140ms ease, box-shadow 140ms ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--accent)";
              el.style.boxShadow = "inset 3px 0 0 var(--accent)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "var(--border)";
              el.style.boxShadow = "none";
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.95rem",
                marginBottom: "0.3rem",
                color: "var(--text)",
              }}
            >
              {label}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <p
                suppressHydrationWarning
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-soft)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {years}
              </p>
              {isActive(years) && (
                <span
                  aria-label="Aprendizaje activo"
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    opacity: 0.8,
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

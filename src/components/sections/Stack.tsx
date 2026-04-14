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
    { label: "Android (Java/Kotlin + XML)", years: "3 años"             },
    { label: ".NET Core",            years: "4 años"                    },
    { label: "NestJS / React / Next.js / Vue", years: "Aprendizaje activo" },
    { label: "PostgreSQL",           years: "Aprendizaje activo"        },
    { label: "SwiftUI",              years: "Exploración puntual"       },
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
            <p className="font-bold text-[1rem] mb-1">{label}</p>
            <p suppressHydrationWarning className="text-[0.78rem] text-[var(--text-soft)] font-mono">
              {years}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

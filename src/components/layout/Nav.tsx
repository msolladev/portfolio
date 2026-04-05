"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const LINKS = [
  { href: "/", label: "inicio" },
  { href: "/sobre-mi", label: "sobre mí" },
  { href: "/blog", label: "blog" },
  { href: "/contacto", label: "contacto" },
  { href: "https://rxresume.msolla.dev/miguelangelss4/miguel-solla", label: "currículum" },
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export function Nav() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(10,10,10,0.85)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 0",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo / nombre */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            color: "var(--accent)",
            letterSpacing: "0.05em",
          }}
        >
          ~/Miguel Solla
        </Link>

        {/* Links */}
        <nav style={{ display: "flex", gap: "2rem" }}>
          {LINKS.map(({ href, label }) => {
            const active = pathname === href;
            const isExternal = !href.startsWith(BASE_URL) && href.startsWith("http");
            return (
              <Link
                key={href}
                href={href}
                className={clsx("nav-link", active && "nav-link--active")}
                style={{
                  fontSize: "0.875rem",
                  color: active ? "var(--accent)" : "var(--text-soft)",
                  transition: "color var(--transition)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.03em",
                }}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}

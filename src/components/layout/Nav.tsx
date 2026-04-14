"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ThemeToggleDesktop, ThemeToggleMobile } from "@/components/ui/ThemeToggle";

const LINKS = [
  { href: "/", label: "inicio" },
  { href: "/sobre-mi", label: "sobre mí" },
  { href: "/blog", label: "blog" },
  { href: "/contacto", label: "contacto" },
  {
    href: "https://rxresume.msolla.dev/miguelangelss4/miguel-solla",
    label: "currículum",
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollYRef.current);
    }
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--bg-nav)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 2rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
              color: "var(--accent)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            ~/Miguel Solla
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <nav style={{ display: "flex", gap: "2rem" }}>
              {LINKS.map(({ href, label }) => {
                const active = pathname === href;
                const isExternal =
                  !href.startsWith(BASE_URL) && href.startsWith("http");

                return (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      letterSpacing: "0.03em",
                      color: active ? "var(--accent)" : "var(--text-soft)",
                      textDecoration: active ? "underline" : "none",
                      textDecorationColor: "var(--accent)",
                      textUnderlineOffset: "4px",
                      transition: "color var(--transition)",
                      fontWeight: active ? "500" : "400",
                    }}
                    onMouseEnter={(e) => {
                      if (!active) e.currentTarget.style.color = "var(--text)";
                    }}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = "var(--text-soft)";
                      e.currentTarget.style.textDecoration = active ? "underline" : "none";
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
            {/* ThemeToggleDesktop */}
            <ThemeToggleDesktop />
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div style={{ height: "60px" }} aria-hidden="true" />

      {/* Mobile theme toggle — visible when menu is closed */}
      <div className="sm:hidden fixed top-[14px] right-[58px] z-[200]">
        <ThemeToggleMobile hidden={open} />
      </div>

      {/* Hamburger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="sm:hidden fixed top-[14px] right-5 z-[200] w-8 h-8 flex items-center justify-center"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <motion.span
          animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
          initial={false}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "24px",
            height: "2px",
            background: "var(--text)",
            transformOrigin: "center",
          }}
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          initial={false}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "24px",
            height: "2px",
            background: "var(--text)",
            transformOrigin: "center",
          }}
        />
        <motion.span
          animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
          initial={false}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: "24px",
            height: "2px",
            background: "var(--text)",
            transformOrigin: "center",
          }}
        />
      </button>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 150,
              backgroundColor: "var(--bg-nav-overlay)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Overlay header row */}
            <div
              style={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1.25rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  color: "var(--accent)",
                }}
              >
                ~/Miguel Solla
              </motion.span>
              {/* ThemeToggleMobile placeholder in overlay */}
            </div>

            {/* Centered links */}
            <nav
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2.5rem",
              }}
            >
              {LINKS.map(({ href, label }, i) => {
                const active = pathname === href;
                const isExternal =
                  !href.startsWith(BASE_URL) && href.startsWith("http");

                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1.75rem",
                        fontWeight: "500",
                        letterSpacing: "0.01em",
                        color: active ? "var(--accent)" : "var(--text-soft)",
                        textDecoration: "none",
                        transition: "color var(--transition)",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) e.currentTarget.style.color = "var(--text)";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.color = "var(--text-soft)";
                      }}
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Decorative bottom rule */}
            <div
              style={{
                height: "1px",
                margin: "2rem",
                background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                opacity: 0.3,
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

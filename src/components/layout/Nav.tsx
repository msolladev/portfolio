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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[100] border-b bg-[var(--bg-nav)] border-[var(--border)]"
      >
        <div className="max-w-[1100px] mx-auto h-[60px] flex items-center justify-between">
          <Link
            href="/"
            className="text-[0.9rem] tracking-[0.05em] text-[var(--accent)] font-mono ps-4"
          >
            ~/Miguel Solla
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <nav className="flex gap-8">
              {LINKS.map(({ href, label }) => {
                const active = pathname === href;
                const isExternal =
                  !href.startsWith(BASE_URL) && href.startsWith("http");

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-sm tracking-[0.03em] font-mono transition-colors ${active ? "text-[var(--accent)]" : "text-[var(--text-soft)]"
                      }`}
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
            <ThemeToggleDesktop />
          </div>
        </div>
      </motion.header>

      {/* Spacer so content is not hidden under the fixed header */}
      <div className="h-[60px]" aria-hidden="true" />

      {/* Mobile theme toggle — visible when menu is closed */}
      <div className="sm:hidden fixed top-[14px] right-[58px] z-[200]">
        <ThemeToggleMobile hidden={open} />
      </div>

      {/* Hamburger button — separate fixed element, above overlay (z-[200] > z-[150]) */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="sm:hidden fixed top-[14px] right-5 z-[200] w-8 h-8 flex items-center justify-center"
      >
        {/* Line 1 */}
        <motion.span
          animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
          initial={false}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute w-6 h-[2px] bg-[var(--text)] origin-center"
        />
        {/* Line 2 */}
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          initial={false}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute w-6 h-[2px] bg-[var(--text)] origin-center"
        />
        {/* Line 3 */}
        <motion.span
          animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
          initial={false}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="absolute w-6 h-[2px] bg-[var(--text)] origin-center"
        />
      </button>

      {/* Mobile full-screen overlay — z-[150]: above header (z-100), below button (z-200) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] bg-[var(--bg-nav-overlay)] flex flex-col sm:hidden"
          >
            {/* Title — top-left, same height as the X button */}
            <div className="h-[60px] flex items-center px-5">
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
                className="text-[var(--accent)] font-mono text-xl tracking-[0.04em]"
              >
                ~/Miguel Solla
              </motion.span>
            </div>

            {/* Links — vertically and horizontally centered in remaining space */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-10">
              {LINKS.map(({ href, label }, i) => {
                const active = pathname === href;
                const isExternal =
                  !href.startsWith(BASE_URL) && href.startsWith("http");

                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`text-2xl font-mono tracking-[0.05em] transition-colors ${active
                        ? "text-[var(--accent)]"
                        : "text-[var(--text-soft)]"
                        }`}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
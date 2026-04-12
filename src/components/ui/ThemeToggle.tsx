"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ─── Icons ────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

const THEME_ICONS: Record<string, React.ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  system: <MonitorIcon />,
};

const THEME_LABELS: Record<string, string> = {
  light: "Modo claro",
  dark: "Modo oscuro",
  system: "Preferencia del sistema",
};

const CYCLE_ORDER = ["system", "light", "dark"] as const;

// ─── Desktop: segmented control ───────────────────────────

export function ThemeToggleDesktop() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[88px] h-[30px]" aria-hidden="true" />;
  }

  return (
    <div
      role="group"
      aria-label="Selector de tema"
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
      }}
    >
      {CYCLE_ORDER.map((t, i) => {
        const active = theme === t;
        const isFirst = i === 0;
        const isLast = i === CYCLE_ORDER.length - 1;
        return (
          <button
            key={t}
            onClick={() => setTheme(t)}
            aria-label={THEME_LABELS[t]}
            aria-pressed={active}
            data-tooltip={THEME_LABELS[t]}
            className="text-decoration-none"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px",
              height: "28px",
              color: active ? "var(--accent)" : "var(--text-soft)",
              background: active ? "var(--surface)" : "transparent",
              border: "none",
              borderRight: isLast ? "none" : "1px solid var(--border)",
              borderRadius: isFirst
                ? "var(--radius) 0 0 var(--radius)"
                : isLast
                ? "0 var(--radius) var(--radius) 0"
                : "0",
              cursor: "pointer",
              transition: "color var(--transition), background var(--transition)",
            }}
          >
            {THEME_ICONS[t]}
          </button>
        );
      })}
    </div>
  );
}

// ─── Mobile: cyclic button ─────────────────────────────────

export function ThemeToggleMobile({ hidden }: { hidden: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const current = (theme ?? "system") as (typeof CYCLE_ORDER)[number];
  const currentIndex = CYCLE_ORDER.indexOf(current);
  const next = CYCLE_ORDER[(currentIndex + 1) % CYCLE_ORDER.length];

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label={THEME_LABELS[current]}
      data-tooltip={THEME_LABELS[current]}
      className="text-decoration-none"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        color: "var(--text-soft)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 150ms ease, color var(--transition)",
      }}
    >
      {THEME_ICONS[current]}
    </button>
  );
}

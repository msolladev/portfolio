"use client";

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem" }}>
      {/* Copper gradient rule */}
      <div
        aria-hidden="true"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 40%, var(--accent) 60%, transparent 100%)",
          opacity: 0.2,
          marginBottom: "0",
        }}
      />

      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1.75rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--text-soft)",
            letterSpacing: "0.02em",
          }}
        >
          © {year} Miguel Solla
        </span>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            href="https://www.linkedin.com/in/miguel-solla/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              color: "var(--text-soft)",
              transition: "color var(--transition)",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.textDecoration = "none";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-soft)")}
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}

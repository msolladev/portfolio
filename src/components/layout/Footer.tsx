import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.8rem",
        color: "var(--text-soft)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <span>© {year} Miguel Solla</span>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link
          href="https://github.com/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-soft)", transition: "color var(--transition)" }}
        >
          github
        </Link>
        <Link
          href="https://linkedin.com/in/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--text-soft)", transition: "color var(--transition)" }}
        >
          linkedin
        </Link>
      </div>
    </footer>
  );
}

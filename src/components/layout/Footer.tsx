import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6 max-w-[1100px] mx-auto flex justify-between items-center text-[0.8rem] text-[var(--text-soft)] font-mono">
      <span>© {year} Miguel Solla</span>
      <div className="flex gap-6">
        <Link
          href="https://www.linkedin.com/in/miguel-solla/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-soft)] transition-colors hover:text-[var(--accent)]"
        >
          LinkedIn
        </Link>
      </div>
    </footer>
  );
}

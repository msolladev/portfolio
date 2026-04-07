"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    currentPage: number;
    totalPages: number;
    perPage: number; // 0 = show all
    perPageOptions: number[];
}

function buildUrl(page: number, perPage: number): string {
    return `/blog?page=${page}&perPage=${perPage}`;
}

function buildPageList(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages = new Set<number>();
    pages.add(1);
    pages.add(2);
    pages.add(total - 1);
    pages.add(total);
    if (current > 1) pages.add(current - 1);
    pages.add(current);
    if (current < total) pages.add(current + 1);

    const sorted = Array.from(pages).sort((a, b) => a - b);
    const result: (number | "…")[] = [];
    for (let i = 0; i < sorted.length; i++) {
        if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
        result.push(sorted[i]);
    }
    return result;
}

const linkStyle = (active: boolean): React.CSSProperties => ({
    color: active ? "var(--accent)" : "var(--text-soft)",
    fontWeight: active ? 700 : 400,
    minWidth: "1.5rem",
    textAlign: "center" as const,
    display: "inline-block",
});

const mutedStyle: React.CSSProperties = {
    color: "var(--muted)",
    minWidth: "1.5rem",
    textAlign: "center",
    display: "inline-block",
};

export function BlogPagination({
    currentPage,
    totalPages,
    perPage,
    perPageOptions,
}: Props) {
    const router = useRouter();
    const pages = buildPageList(currentPage, totalPages);

    return (
        <div
            style={{
                marginTop: "3rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
            }}
        >
            {/* Per-page selector */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem",
                    color: "var(--text-soft)",
                }}
            >
                <span>por página:</span>
                {perPageOptions.map((n) => (
                    <button
                        key={n}
                        onClick={() => router.push(`/blog?page=1&perPage=${n}`)}
                        style={{
                            color: n === perPage ? "var(--accent)" : "var(--text-soft)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.85rem",
                            fontWeight: n === perPage ? 700 : 400,
                            background: "none",
                            border: "none",
                            cursor: n === perPage ? "default" : "pointer",
                            padding: 0,
                        }}
                        aria-current={n === perPage ? "true" : undefined}
                    >
                        {n}
                    </button>
                ))}
                <button
                    onClick={() => router.push(`/blog?page=1&perPage=0`)}
                    style={{
                        color: perPage === 0 ? "var(--accent)" : "var(--text-soft)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        fontWeight: perPage === 0 ? 700 : 400,
                        background: "none",
                        border: "none",
                        cursor: perPage === 0 ? "default" : "pointer",
                        padding: 0,
                    }}
                    aria-current={perPage === 0 ? "true" : undefined}
                >
                    todos
                </button>
            </div>

            {/* Page number navigation */}
            {totalPages > 1 && (
                <nav
                    aria-label="Paginación"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Primera */}
                    {currentPage > 1 ? (
                        <Link href={buildUrl(1, perPage)} style={linkStyle(false)} title="Primera página">
                            «
                        </Link>
                    ) : (
                        <span style={mutedStyle}>«</span>
                    )}

                    {/* Anterior */}
                    {currentPage > 1 ? (
                        <Link href={buildUrl(currentPage - 1, perPage)} style={linkStyle(false)}>
                            ← ant
                        </Link>
                    ) : (
                        <span style={mutedStyle}>← ant</span>
                    )}

                    {/* Números */}
                    {pages.map((p, i) =>
                        p === "…" ? (
                            <span key={`ellipsis-${i}`} style={{ color: "var(--text-soft)" }}>
                                …
                            </span>
                        ) : (
                            <Link
                                key={p}
                                href={buildUrl(p, perPage)}
                                style={linkStyle(p === currentPage)}
                                aria-current={p === currentPage ? "page" : undefined}
                            >
                                {p}
                            </Link>
                        )
                    )}

                    {/* Siguiente */}
                    {currentPage < totalPages ? (
                        <Link href={buildUrl(currentPage + 1, perPage)} style={linkStyle(false)}>
                            sig →
                        </Link>
                    ) : (
                        <span style={mutedStyle}>sig →</span>
                    )}

                    {/* Última */}
                    {currentPage < totalPages ? (
                        <Link href={buildUrl(totalPages, perPage)} style={linkStyle(false)} title="Última página">
                            »
                        </Link>
                    ) : (
                        <span style={mutedStyle}>»</span>
                    )}
                </nav>
            )}
        </div>
    );
}

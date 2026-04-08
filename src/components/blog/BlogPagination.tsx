"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
    currentPage: number;
    totalPages: number;
    perPage: number; // 0 = show all
    perPageOptions: number[];
    order: "asc" | "desc";
}

function buildUrl(page: number, perPage: number, order: string): string {
    return `/blog?page=${page}&perPage=${perPage}&order=${order}`;
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

const btnBase = "font-mono text-[0.85rem] bg-transparent border-0 p-2 cursor-pointer text-[var(--text-soft)] transition-colors";
const btnActive = "text-[var(--accent)] font-bold cursor-default active";
const btnInactive = "hover:text-[var(--text)] cursor-pointer";

const pageBase = "font-mono text-[0.85rem] min-w-[1.5rem] text-center p-2 inline-block transition-colors";
const pageActive = "text-[var(--accent)] font-bold active";
const pageInactive = "text-[var(--text-soft)] hover:text-[var(--text)]";
const pageMuted = "text-[var(--muted)] min-w-[1.5rem] text-center inline-block";

export function BlogPagination({
    currentPage,
    totalPages,
    perPage,
    perPageOptions,
    order,
}: Props) {
    const router = useRouter();
    const pages = buildPageList(currentPage, totalPages);

    return (
        <div className="mt-12 font-mono text-[0.85rem]">
            {/* Controls row */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-[var(--text-soft)]">
                {/* Per-page selector */}
                <div className="flex items-center gap-1">
                    <span>por página:</span>
                    {perPageOptions.map((n) => (
                        <button
                            key={n}
                            onClick={() => router.push(`/blog?page=1&perPage=${n}&order=${order}`)}
                            className={`${btnBase} ${n === perPage ? btnActive : btnInactive}`}
                            aria-current={n === perPage ? "true" : undefined}
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        onClick={() => router.push(`/blog?page=1&perPage=0&order=${order}`)}
                        className={`${btnBase} ${perPage === 0 ? btnActive : btnInactive}`}
                        aria-current={perPage === 0 ? "true" : undefined}
                    >
                        todos
                    </button>
                </div>
                |
                {/* Order selector */}
                <div className="flex items-center gap-1">
                    <span className="p-2">orden:</span>
                    <button
                        onClick={() => router.push(`/blog?page=1&perPage=${perPage}&order=desc`)}
                        className={`${btnBase} ${order === "desc" ? btnActive : btnInactive}`}
                        aria-current={order === "desc" ? "true" : undefined}
                    >
                        recientes
                    </button>
                    <button
                        onClick={() => router.push(`/blog?page=1&perPage=${perPage}&order=asc`)}
                        className={`${btnBase} ${order === "asc" ? btnActive : btnInactive}`}
                        aria-current={order === "asc" ? "true" : undefined}
                    >
                        antiguos
                    </button>
                </div>
            </div>

            {/* Page number navigation */}
            {totalPages > 1 && (
                <nav aria-label="Paginación" className="flex flex-wrap items-center gap-[0.6rem]">
                    {/* Primera */}
                    {currentPage > 1 ? (
                        <Link href={buildUrl(1, perPage, order)} className={`${pageBase} ${pageInactive}`} title="Primera página">
                            «
                        </Link>
                    ) : (
                        <span className={pageMuted}>«</span>
                    )}

                    {/* Anterior */}
                    {currentPage > 1 ? (
                        <Link href={buildUrl(currentPage - 1, perPage, order)} className={`${pageBase} ${pageInactive}`}>
                            ← ant
                        </Link>
                    ) : (
                        <span className={pageMuted}>← ant</span>
                    )}

                    {/* Números */}
                    {pages.map((p, i) =>
                        p === "…" ? (
                            <span key={`ellipsis-${i}`} className="text-[var(--text-soft)]">…</span>
                        ) : (
                            <Link
                                key={p}
                                href={buildUrl(p, perPage, order)}
                                className={`${pageBase} ${p === currentPage ? pageActive : pageInactive}`}
                                aria-current={p === currentPage ? "page" : undefined}
                            >
                                {p}
                            </Link>
                        )
                    )}

                    {/* Siguiente */}
                    {currentPage < totalPages ? (
                        <Link href={buildUrl(currentPage + 1, perPage, order)} className={`${pageBase} ${pageInactive}`}>
                            sig →
                        </Link>
                    ) : (
                        <span className={pageMuted}>sig →</span>
                    )}

                    {/* Última */}
                    {currentPage < totalPages ? (
                        <Link href={buildUrl(totalPages, perPage, order)} className={`${pageBase} ${pageInactive}`} title="Última página">
                            »
                        </Link>
                    ) : (
                        <span className={pageMuted}>»</span>
                    )}
                </nav>
            )}
        </div>
    );
}


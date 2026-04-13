"use client";

interface Props {
    currentPage: number;
    totalPages: number;
    perPage: number;
    perPageOptions: number[];
    order: "asc" | "desc";
    onPageChange: (page: number) => void;
    onPerPageChange: (perPage: number) => void;
    onOrderChange: (order: "asc" | "desc") => void;
}

function buildPageList(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = new Set<number>();
    pages.add(1); pages.add(2); pages.add(total - 1); pages.add(total);
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

const btn = "font-mono text-[0.85rem] bg-transparent border-0 p-2 cursor-pointer text-[var(--text-soft)] transition-colors hover:text-[var(--text)]";
const btnOn = "font-mono text-[0.85rem] bg-transparent border-0 p-2 text-[var(--accent)] font-bold";
const pg = "font-mono text-[0.85rem] min-w-[1.5rem] text-center p-2 inline-block transition-colors text-[var(--text-soft)] hover:text-[var(--text)] cursor-pointer";
const pgOn = "font-mono text-[0.85rem] min-w-[1.5rem] text-center p-2 inline-block text-[var(--accent)] font-bold";
const pgOff = "font-mono text-[0.85rem] min-w-[1.5rem] text-center p-2 inline-block text-[var(--muted)]";


export function BlogPagination({
    currentPage, totalPages, perPage, perPageOptions, order,
    onPageChange, onPerPageChange, onOrderChange,
}: Props) {
    const pages = buildPageList(currentPage, totalPages);

    return (
        <div className="mt-6 font-mono text-[0.85rem]">
            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4 text-[var(--text-soft)]">
                <div className="flex items-center gap-1">
                    <span>por página:</span>
                    {perPageOptions.map((n) => (
                        <button key={n} onClick={() => onPerPageChange(n)}
                            className={perPage === n ? btnOn : btn}>
                            {n}
                        </button>
                    ))}
                    <button onClick={() => onPerPageChange(0)}
                        className={perPage === 0 ? btnOn : btn}>
                        todos
                    </button>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1">
                    <span>orden:</span>
                    <button onClick={() => onOrderChange("asc")}
                        className={order === "asc" ? btnOn : btn}>antiguos</button>
                    <button onClick={() => onOrderChange("desc")}
                        className={order === "desc" ? btnOn : btn}>recientes</button>
                </div>
            </div>

            {/* Pages */}
            <nav aria-label="Paginación" className="flex flex-wrap items-center gap-[0.6rem]">
                <button onClick={currentPage > 1 ? () => onPageChange(1) : undefined}
                    className={currentPage > 1 ? pg : pgOff} title="Primera">«</button>
                <button onClick={currentPage > 1 ? () => onPageChange(currentPage - 1) : undefined}
                    className={currentPage > 1 ? pg : pgOff}>← ant</button>

                {pages.map((p, i) =>
                    p === "…"
                        ? <span key={`e-${i}`} className="text-[var(--text-soft)]">…</span>
                        : <button key={p} onClick={() => onPageChange(p)}
                            className={p === currentPage ? pgOn : pg}
                            aria-current={p === currentPage ? "page" : undefined}>
                            {p}
                        </button>
                )}

                <button onClick={currentPage < totalPages ? () => onPageChange(currentPage + 1) : undefined}
                    className={currentPage < totalPages ? pg : pgOff}>sig →</button>
                <button onClick={currentPage < totalPages ? () => onPageChange(totalPages) : undefined}
                    className={currentPage < totalPages ? pg : pgOff} title="Última">»</button>
            </nav>
        </div>
    );
}
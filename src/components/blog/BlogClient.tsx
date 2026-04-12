"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPagination } from "@/components/blog/BlogPagination";
import type { PostMeta } from "@/lib/posts";

const PER_PAGE_OPTIONS = [5, 10, 20];
const DEFAULT_PER_PAGE = 5;

interface Props {
    allPosts: PostMeta[];
}

function highlight(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;

    const terms = query.trim().toLowerCase().split(/\s+/); // Dividir en términos
    const escapedTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(`(${escapedTerms.join("|")})`, "gi"); // Crear regex para todos los términos

    const parts = text.split(regex);
    return parts.map((part, i) =>
        terms.some((term) => part.toLowerCase() === term)
            ? <mark key={i}>{part}</mark>
            : part
    );
}

// Función para extraer fragmentos de texto con términos destacados
function extractBodyFragments(body: string, query: string): string[] {
    if (!query.trim()) return [];

    const terms = query.trim().toLowerCase().split(/\s+/); // Dividir en términos
    const fragments: string[] = [];

    terms.forEach((term) => {
        const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`.{0,30}(${escaped}).{0,30}`, "gi");
        let match;

        while ((match = regex.exec(body)) !== null) {
            fragments.push(match[0]);
        }
    });

    return fragments;
}

const btn = "font-mono text-[0.85rem] bg-transparent border-0 p-2 cursor-pointer text-[var(--text-soft)] transition-colors hover:text-[var(--text)]";
const btnOn = "font-mono text-[0.85rem] bg-transparent border-0 p-2 text-[var(--accent)] font-bold";

export function BlogClient({ allPosts }: Props) {
    const [query, setQuery] = useState("");
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return allPosts;

        const terms = q.split(/\s+/); // Dividir el input en términos separados por espacios

        return allPosts.filter((p) => {
            const inTitle = terms.some((term) => p.title.toLowerCase().includes(term));
            const inDescription = terms.some((term) => p.description.toLowerCase().includes(term));
            const inTags = terms.some((term) => p.tags.some((t) => t.toLowerCase().includes(term)));
            const inContent = terms.some((term) => p.content.toLowerCase().includes(term));

            return inTitle || inDescription || inTags || inContent;
        });
    }, [query, allPosts]);

    const sortedPosts = useMemo(() => {
        const parseDate = (dateStr: string) => {
            const [year, month, day] = dateStr.split("-").map(Number);
            return new Date(year, month - 1, day).getTime();
        };

        return [...filtered].sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, [filtered, order]);

    const showAll = perPage === 0;
    const totalPages = showAll ? 1 : Math.max(1, Math.ceil(filtered.length / perPage));
    const current = Math.min(page, totalPages);
    const posts = showAll
        ? sortedPosts
        : sortedPosts.slice((current - 1) * perPage, current * perPage);

    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setPage(1);
    };

    const handlePerPage = (n: number) => {
        setPerPage(n);
        setPage(1);
    };

    const handleOrder = (o: "asc" | "desc") => {
        setOrder(o);
        setPage(1);
    };

    return (
        <>
            {/* Buscador */}
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={query}
                    onChange={handleQuery}
                    className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius)] p-3 pr-10 text-[var(--text)] font-mono text-sm outline-none transition-colors focus:border-[var(--accent)]"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 inset-y-0 mt-4 h-fit text-[var(--accent)] text-lg leading-none text-decoration-none"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
                {query && (
                    <p className="mt-2 text-[0.85rem] text-[var(--text-soft)] font-mono">
                        Buscando resultados para &ldquo;{query}&rdquo; ({filtered.length} resultado{filtered.length !== 1 ? "s" : ""})
                    </p>
                )}
            </div>

            {filtered.length === 0 ? (
                <p style={{ color: "var(--text-soft)", fontFamily: "var(--font-mono)" }}>
                    No hay artículos que coincidan con &ldquo;{query}&rdquo;.
                </p>
            ) : (
                <>
                    <BlogPagination
                        currentPage={current}
                        totalPages={totalPages}
                        perPage={perPage}
                        perPageOptions={PER_PAGE_OPTIONS}
                        order={order}
                        onPageChange={setPage}
                        onPerPageChange={handlePerPage}
                        onOrderChange={handleOrder}
                    />

                    <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {posts.map((post) => {
                            const bodyFragments = extractBodyFragments(post.content, query);

                            return (
                                <li key={post.slug} className="border-b border-border py-8 last:border-none last:pb-0">
                                    <div className="flex gap-4 mb-2 font-mono text-[0.78rem] text-soft">
                                        <time>{post.date}</time>
                                        <span>·</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="block">
                                        <h2 className="post-title text-[1.3rem] font-bold mb-2">
                                            {highlight(post.title, query)}
                                        </h2>
                                    </Link>
                                    <p className="text-[0.95rem] leading-[1.6] text-soft">
                                        {highlight(post.description, query)}
                                    </p>
                                    {bodyFragments.length > 0 && (
                                        <p className="mt-4 text-[0.9rem] leading-[1.5] text-soft">
                                            ... {bodyFragments.map((fragment, index) => (
                                                <span key={index}>
                                                    {highlight(fragment, query)}
                                                    {index < bodyFragments.length - 1 && " ... "}
                                                </span>
                                            ))} ...
                                        </p>
                                    )}
                                    <div className="flex gap-2 mt-2">
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className={`text-[0.8rem] bg-[var(--text-soft)] px-2 py-1 rounded ${query.trim() && tag.toLowerCase().includes(query.toLowerCase()) ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
                                                onClick={() => setQuery((prev) => prev.trim() ? `${prev} ${tag}` : tag)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {highlight(tag, query)}
                                            </span>
                                        ))}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>

                    <BlogPagination
                        currentPage={current}
                        totalPages={totalPages}
                        perPage={perPage}
                        perPageOptions={PER_PAGE_OPTIONS}
                        order={order}
                        onPageChange={setPage}
                        onPerPageChange={handlePerPage}
                        onOrderChange={handleOrder}
                    />
                </>
            )}
        </>
    );
}
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPagination } from "@/components/blog/BlogPagination";
import type { Post } from "@/lib/posts";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const PER_PAGE_OPTIONS = [5, 10, 20];
const DEFAULT_PER_PAGE = 5;

interface Props {
  allPosts: Post[];
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
      <div style={{ position: "relative", marginBottom: "2.5rem" }}>
        <input
          type="text"
          placeholder="Buscar artículos..."
          value={query}
          onChange={handleQuery}
          style={{
            width: "100%",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "0.85rem 2.5rem 0.85rem 1rem",
            color: "var(--text)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
            outline: "none",
            transition: "border-color var(--transition), box-shadow var(--transition)",
          }}
          onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)"; }}
          onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            style={{
              position: "absolute",
              right: "0.875rem",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "var(--accent)",
              fontSize: "1rem",
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
              paddingTop: "55px",
            }}
          >
            ✕
          </button>
        )}
        {query && (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8rem",
              color: "var(--text-soft)",
              fontFamily: "var(--font-mono)",
            }}
          >
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
                <li
                  key={post.slug}
                  style={{
                    borderBottom: "1px solid rgba(201, 146, 74, 0.12)",
                    padding: "2rem 0",
                  }}
                >
                  {/* Date + read time */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      marginBottom: "0.6rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      color: "var(--text-soft)",
                    }}
                  >
                    <time>{format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</time>
                    <span style={{ color: "var(--border)" }}>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ display: "block", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget.querySelector("h2") as HTMLElement).style.color = "var(--accent)"; e.currentTarget.style.textDecoration = "none"; }}
                    onMouseLeave={(e) => { (e.currentTarget.querySelector("h2") as HTMLElement).style.color = "var(--text)"; }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                        color: "var(--text)",
                        lineHeight: 1.2,
                        transition: "color var(--transition)",
                      }}
                    >
                      {highlight(post.title, query)}
                    </h2>
                  </Link>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      lineHeight: 1.65,
                      color: "var(--text-soft)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {highlight(post.description, query)}
                  </p>

                  {/* Body fragments */}
                  {bodyFragments.length > 0 && (
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        color: "var(--text-soft)",
                        marginBottom: "0.75rem",
                        fontStyle: "italic",
                      }}
                    >
                      ...{bodyFragments.map((fragment, index) => (
                        <span key={index}>
                          {highlight(fragment, query)}
                          {index < bodyFragments.length - 1 && " ... "}
                        </span>
                      ))}...
                    </p>
                  )}

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {post.tags.map((tag, index) => {
                      const isActive = query.trim() && tag.toLowerCase().includes(query.toLowerCase());
                      return (
                        <span
                          key={index}
                          onClick={() => setQuery((prev) => prev.trim() ? `${prev} ${tag}` : tag)}
                          style={{
                            cursor: "pointer",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            padding: "0.2rem 0.6rem",
                            borderRadius: "4px",
                            background: "var(--surface-2)",
                            color: isActive ? "var(--accent)" : "var(--text-soft)",
                            border: "1px solid var(--border)",
                            transition: "color var(--transition), border-color var(--transition)",
                          }}
                        >
                          {highlight(tag, query)}
                        </span>
                      );
                    })}
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
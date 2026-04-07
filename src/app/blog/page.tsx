import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BlogPagination } from "@/components/blog/BlogPagination";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos técnicos sobre desarrollo web, arquitectura y criterio de ingeniería.",
};

const PER_PAGE_OPTIONS = [ 5, 10, 20 ];
const DEFAULT_PER_PAGE = 5;
// perPage === 0 means "show all"

interface Props {
  searchParams: Promise<{ page?: string; perPage?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page, perPage: perPageParam } = await searchParams;

  const perPageNum = Number(perPageParam);
  const showAll = perPageNum === 0;
  const perPage = showAll
    ? 0
    : PER_PAGE_OPTIONS.includes(perPageNum)
      ? perPageNum
      : DEFAULT_PER_PAGE;

  const allPosts = getAllPosts();
  const totalPages = showAll ? 1 : Math.max(1, Math.ceil(allPosts.length / perPage));
  const current = showAll ? 1 : Math.min(Math.max(1, Number(page) || 1), totalPages);
  const posts = showAll ? allPosts : allPosts.slice((current - 1) * perPage, current * perPage);

  return (
    <>
      <Nav />
      <main className="page-content-narrow">
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          blog
        </p>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "3rem",
          }}
        >
          Pensamientos en voz alta.
        </h1>

        {allPosts.length === 0 ? (
          <p style={{ color: "var(--text-soft)" }}>
            Próximamente. El primer post está en camino.
          </p>
        ) : (
          <>
            <BlogPagination
              currentPage={current}
              totalPages={totalPages}
              perPage={perPage}
              perPageOptions={PER_PAGE_OPTIONS}
            />

            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {posts.map((post) => (
                <li
                  key={post.slug}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    padding: "2rem 0",
                  }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ display: "block" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "0.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "var(--text-soft)",
                      }}
                    >
                      <time>{post.date}</time>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2
                      className="post-title"
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                      }}
                    >
                      {post.title}
                    </h2>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>

            <BlogPagination
              currentPage={current}
              totalPages={totalPages}
              perPage={perPage}
              perPageOptions={PER_PAGE_OPTIONS}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

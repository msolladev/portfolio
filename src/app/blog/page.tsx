import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos técnicos sobre desarrollo web, arquitectura y criterio de ingeniería.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "5rem 1.5rem 8rem",
        }}
      >
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
          Pensamiento en voz alta.
        </h1>

        {posts.length === 0 ? (
          <p style={{ color: "var(--text-soft)" }}>
            Próximamente. El primer post está en camino.
          </p>
        ) : (
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
        )}
      </main>
      <Footer />
    </>
  );
}

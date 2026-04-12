import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BlogClient } from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos técnicos sobre desarrollo web, arquitectura y criterio de ingeniería.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog` },
  keywords: ["blog técnico", "artículos desarrollo web", "programación", "arquitectura software", "PHP", "Laravel", "Node.js", "mi experiencia", "opiniones técnicas", "carrera como developer", "consejos para developers"],
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="page-content" style={{ maxWidth: "720px" }}>
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
          Pensamtos en voz alta.
        </h1>

        <BlogClient allPosts={allPosts} />
      </main>
      <Footer />
    </>
  );
}
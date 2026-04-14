import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BlogClient } from "@/components/blog/BlogClient";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos técnicos sobre desarrollo web, arquitectura y criterio de ingeniería.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog` },
  keywords: ["blog técnico", "artículos desarrollo web", "programación", "arquitectura software", "PHP", "Laravel", "Node.js", "mi experiencia", "opiniones técnicas", "carrera como developer", "consejos para developers"],
};

export default function BlogPage() {
  const allPosts = getAllPosts();

  const formattedPosts = allPosts.map(post => ({
    ...post,
    formattedDate: format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })
  }));

  return (
    <>
      <Nav />
      <main className="page-content-narrow">
        <p className="section-label" style={{ color: "var(--accent)", marginBottom: "1.5rem" }}>
          blog
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "clamp(1.5rem, 5vw, 3rem)",
            color: "var(--text)",
          }}
        >
          Pensamientos en voz alta.
        </h1>

        <BlogClient allPosts={formattedPosts} />
      </main>
      <Footer />
    </>
  );
}

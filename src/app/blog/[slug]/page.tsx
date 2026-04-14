import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { format } from 'date-fns';
import { es } from "date-fns/locale";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: { title: post.title, description: post.description },
      alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}` },
      keywords: post.tags,
    };
  } catch {
    return { title: "Post no encontrado" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Nav />
      <main className="page-content-narrow">
        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--accent)",
            marginBottom: "1.5rem",
            letterSpacing: "0.04em",
          }}
        >
          <time>{format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</time>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ color: "var(--text-soft)" }}>{post.readTime}</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            color: "var(--text)",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "var(--text-soft)",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          {post.description}
        </p>

        {/* Copper gradient divider */}
        <div
          aria-hidden="true"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, var(--accent) 0%, transparent 60%)",
            opacity: 0.3,
            marginBottom: "2.5rem",
          }}
        />

        {/* MDX content */}
        <article
          className="prose"
          style={{
            color: "var(--text-soft)",
            lineHeight: 1.8,
            fontSize: "1rem",
          }}
        >
          <MDXRemote source={post.content} />
        </article>
      </main>
      <Footer />
    </>
  );
}

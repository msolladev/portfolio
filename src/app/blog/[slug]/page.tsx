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
        <div className="flex gap-4 font-mono text-[0.78rem] text-[var(--text-soft)] mb-6">
          <time>{format(new Date(post.date), "d 'de' MMMM 'de' yyyy", { locale: es })}</time>
          <span style={{ color: "var(--border)" }}>·</span>
          <span style={{ color: "var(--text-soft)" }}>{post.readTime}</span>
        </div>

        <h1
          className="font-display font-extrabold tracking-[-0.03em] leading-[1.15] mb-4 text-[var(--text)]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
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
        <article className="prose text-[var(--text-soft)] leading-[1.8]">
          <MDXRemote source={post.content} />
        </article>
      </main>
      <Footer />
    </>
  );
}

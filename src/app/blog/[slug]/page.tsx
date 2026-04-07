import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/posts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

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
            color: "var(--text-soft)",
            marginBottom: "1.5rem",
          }}
        >
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: "1rem",
          }}
        >
          {post.title}
        </h1>

        <p className="text-[1.1rem] text-[var(--text-soft)] mb-12 sm:mb-6 leading-[1.7]">
          {post.description}
        </p>

        <hr className="border-0 border-t border-[var(--border)] mb-12 sm:mb-6" />

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

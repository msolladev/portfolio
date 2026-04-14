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
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <h1
          className="font-display font-extrabold tracking-[-0.03em] leading-[1.15] mb-4 text-[var(--text)]"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          {post.title}
        </h1>

        <p className="text-[1.1rem] text-[var(--text-soft)] mb-12 sm:mb-6 leading-[1.7]">
          {post.description}
        </p>

        <hr className="border-0 border-t border-[var(--border)] mb-12 sm:mb-6" />

        {/* MDX content */}
        <article className="prose text-[var(--text-soft)] leading-[1.8]">
          <MDXRemote source={post.content} />
        </article>
      </main>
      <Footer />
    </>
  );
}

import fs     from "fs";
import path   from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug:        string;
  title:       string;
  description: string;
  date:        string;
  tags:        string[];
  readTime:    string;
  draft?:      boolean;
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR   = path.join(process.cwd(), "content/blog");
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

function calculateReadTime(content: string): string {
  const words   = content.trim().split(/\s+/).length;
  const minutes = Math.round(words / 220);
  return `${Math.max(1, minutes)} min`;
}

function parseDate(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function isVisible(post: Post): boolean {
  return SHOW_DRAFTS || !post.draft;
}

function readPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8");
  const { data, content } = matter(raw);
  const body = content || "";
  return { slug, content: body, ...data, readTime: calculateReadTime(body) } as Post;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readPost(file.replace(/\.mdx$/, "")))
    .filter(isVisible)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
}

export function getPost(slug: string): Post {
  const post = readPost(slug);
  if (!isVisible(post)) throw new Error(`Post no publicado: ${slug}`);
  return post;
}
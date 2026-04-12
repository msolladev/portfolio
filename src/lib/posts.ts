import fs   from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug:        string;
  title:       string;
  description: string;
  date:        string;
  tags:        string[];
  readTime:    string;
  content:     string; // Make content required
}

export interface Post extends PostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug    = file.replace(/\.mdx$/, "");
      const raw     = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return { slug, content: content || "", ...data } as Post;
    })
    .sort((a, b) => {
      const parseDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split("-").map(Number);
          return new Date(year, month - 1, day).getTime();
      };
      return parseDate(b.date) - parseDate(a.date);
    });
}

export function getPost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw      = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, content, ...data } as Post;
}

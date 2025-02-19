import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  published: boolean;
}

function getDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    const [, year, month, day] = match;
    const paddedMonth = month.padStart(2, "0");
    const paddedDay = day.padStart(2, "0");
    return `${year}-${paddedMonth}-${paddedDay}`;
  }
  return "";
}

function getTitleFromFilename(filename: string): string {
  // Remove date prefix and extension, then convert to title case
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.(mdx?|tsx)$/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), "src/app/blog/posts");
  const items = fs.readdirSync(postsDirectory, { withFileTypes: true });

  const posts = items
    .filter(
      (item) => item.isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(item.name)
    )
    .map((dir) => {
      const slug = dir.name;
      const date = getDateFromFilename(slug);

      // Read the MDX file inside the directory
      const mdxPath = path.join(postsDirectory, dir.name, "page.mdx");
      let title = getTitleFromFilename(slug);
      let published = true;

      try {
        if (fs.existsSync(mdxPath)) {
          const fileContents = fs.readFileSync(mdxPath, "utf8");
          const { data: frontmatter } = matter(fileContents);
          if (frontmatter.title) {
            title = frontmatter.title;
          }
          if (typeof frontmatter.published === "boolean") {
            published = frontmatter.published;
          }
        }
      } catch (err) {
        console.warn(`Could not read frontmatter for ${slug}:`, err);
      }

      return {
        slug,
        title,
        date,
        published,
      };
    })
    .filter((post) => post.published);

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

interface BlogPostListProps {
  posts: BlogPost[];
  limit?: number;
}

export default function BlogPostList({ posts, limit }: BlogPostListProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="space-y-4">
      {displayPosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/posts/${post.slug}`}
          className="group block p-7 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-transparent dark:hover:border-transparent hover:bg-white dark:hover:bg-black/40 hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0px_4px_16px_rgba(0,0,0,0.4)] transition-all duration-300 relative bg-gray-50/50 dark:bg-black/10"
        >
          <div className="absolute right-7 top-7 text-gray-300 dark:text-gray-600 group-hover:text-[#9A5BFF] dark:group-hover:text-[#9A5BFF] transition-colors">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform -rotate-45"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="pr-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[#9A5BFF] dark:group-hover:text-[#9A5BFF] transition-colors leading-relaxed">
              {post.title}
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

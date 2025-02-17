import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default function Blog() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map(({ id, date, title }) => (
          <article key={id} className="p-6 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]">
            <Link href={`/blog/${id}`}>
              <h2 className="text-xl font-semibold mb-2">{title}</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
}

function getDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    const [, year, month, day] = match;
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
  }
  return '';
}

function getTitleFromFilename(filename: string): string {
  // Remove date prefix and extension, then convert to title case
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .replace(/\.(mdx?|tsx)$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'src/app/blog');
  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => {
      const date = getDateFromFilename(filename);
      const title = getTitleFromFilename(filename);
      const slug = filename.replace(/\.mdx$/, '');
      
      return {
        slug,
        title,
        date,
      };
    });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-[#9A5BFF] to-pink-400 bg-clip-text text-transparent">
        Blog Posts
      </h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group block p-7 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-transparent dark:hover:border-transparent hover:bg-white dark:hover:bg-white/[0.05] hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0px_4px_16px_rgba(0,0,0,0.4)] transition-all duration-300 relative bg-gray-50/50 dark:bg-gray-900/50"
          >
            <div className="absolute right-7 top-7 text-gray-300 dark:text-gray-600 group-hover:text-[#9A5BFF] dark:group-hover:text-[#9A5BFF] transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="pr-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[#9A5BFF] dark:group-hover:text-[#9A5BFF] transition-colors leading-relaxed">
                {post.title}
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
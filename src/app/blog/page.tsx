import BlogPostList, { getBlogPosts } from '@/components/blog-post-list';

export default function BlogIndex() {
  const posts = getBlogPosts();

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] antialiased bg-white dark:bg-dark-spot">
      <main className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-400 via-[#9A5BFF] to-pink-400 bg-clip-text text-transparent">
          Blog Posts
        </h1>
        <BlogPostList posts={posts} />
      </main>
    </div>
  );
} 
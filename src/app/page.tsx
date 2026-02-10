import Link from 'next/link';
import Image from 'next/image';
import BlogPostList, { getBlogPosts } from '@/components/blog-post-list';

export default function Home() {
  const posts = getBlogPosts();
  const recentPosts = posts.slice(0, 5); // Get 5 most recent posts

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] antialiased bg-white dark:bg-dark-spot">
      <main className="mx-auto max-w-6xl pt-8 sm:pt-16">
        {/* Profile Section */}
        <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-center mb-20 max-w-4xl mx-auto">
          <div className="relative w-48 h-48 flex-shrink-0">
            {/* Gradient border wrapper */}
            <div className="absolute -inset-[3px] bg-gradient-to-br from-blue-400 via-[#9A5BFF] to-pink-400 rounded-full"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-black p-[3px]">
              <Image
                src="/profile.jpg"
                alt="Profile picture"
                fill
                className="object-cover rounded-full"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-[#9A5BFF] to-pink-400 bg-clip-text text-transparent">
              Rune Dohrn
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Hey, I&apos;m Rune! 👋 I am an <b>engineer</b> and <b>founder</b>. I am an unapologetic <b>futurist</b> and a relentless <b>optimizer</b>. I love figuring out how the world works and how to make it better.
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Let&apos;s connect! 🤝
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="flex gap-6 justify-center">
                <a
                  href="https://github.com/dr0l3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Image
                    src="/github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="opacity-80 dark:invert"
                  />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/rune-drole-dohrn-80723b93/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Image
                    src="/linkedin.svg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="opacity-80 dark:invert"
                  />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1.4fr] gap-16 mt-8">
          {/* Guide Section */}
          <section className="md:pr-12">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-[#9A5BFF] to-pink-400 bg-clip-text text-transparent">
              Working Together
            </h2>
            <div className="prose dark:prose-invert">
              <p>
                I believe in <b>continual learning</b>, solving the right problems at the right time, and <b>focusing on the users</b>. I love <b>first-principles thinking</b> and <b>truly understanding</b> a domain—but sometimes, the best way to learn is to throw all of that out the window and just <b>ship some software</b> 🚀
              </p>
              <p>
                I also think a lot about education. Here are three posts that focus on core constraints and “problem” framing:
              </p>
              <ul>
                <li>
                  <Link href="/blog/posts/2026-01-10-the-attention-problem" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    The attention and motivation problem
                  </Link>
                </li>
                <li>
                  <Link href="/blog/posts/2026-01-08-the-learning-rate-problem" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    The learning rate problem
                  </Link>
                </li>
                <li>
                  <Link href="/blog/posts/2026-01-16-the-reuse-problem" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    The reuse problem
                  </Link>
                </li>
              </ul>
              <p>
                If you&apos;re curious about how I think about problem-solving and software development, here are three posts that capture my perspective 🤔
              </p>
              <ul>
                <li>
                  <Link href="/blog/posts/2023-06-04-simple-problems-solved-llm-style" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Simple problems solved LLM style
                  </Link>
                  {' '}– A look at simple problems from the point of view of an LLM. Surprisingly insightful 🤖
                </li>
                <li>
                  <Link href="/blog/posts/2018-12-08-innovation-isnt-done-in-crowds" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Innovation isn&apos;t done in crowds
                  </Link>
                  {' '}– Rather snarky, but still something I believe in. 💡
                </li>
                <li>
                  <Link href="blog/posts/2023-01-04-madness-and-brilliance" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Madness and brilliance
                  </Link>
                  {' '}– Quantity or quality? The answer might surprise you 🎯
                </li>
              </ul>
              <p>
                I&apos;ve been humbled by failure many times—and I&apos;ve come to see that truly understanding the world <b>for what it is</b>, not what you want it to be, is a superpower.
              </p>
              
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="md:pl-10">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-[#9A5BFF] to-pink-400 bg-clip-text text-transparent">
              Recent Blog Posts
            </h2>
            <BlogPostList posts={recentPosts} />
            <Link 
              href="/blog"
              className="inline-flex items-center gap-1 mt-8 text-sm font-medium text-[#9A5BFF] hover:text-[#8347FF] dark:text-[#9A5BFF] dark:hover:text-[#B47FFF]"
            >
              View all posts
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
                <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

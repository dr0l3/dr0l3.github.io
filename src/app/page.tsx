import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

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
  const items = fs.readdirSync(postsDirectory, { withFileTypes: true });
  
  const posts = items
    .filter(item => item.isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(item.name))
    .map(dir => {
      const slug = dir.name;
      const date = getDateFromFilename(slug);
      const title = getTitleFromFilename(slug);
      
      return {
        slug,
        title,
        date,
      };
    });

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export default function Home() {
  const posts = getBlogPosts();
  const recentPosts = posts.slice(0, 5); // Get 5 most recent posts

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] antialiased bg-white dark:bg-black">
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
              Hey, I&apos;m Rune! 👋 I am an <b>engineer</b> and <b>founder</b>. I love building products that people <b>enjoy using</b>. I&apos;m always thinking about how great <b>design</b>, <b>technology</b>, <b>product</b> and <b>business decisions</b> combine to create better outcomes.
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
                If you&apos;re curious about how I think about problem-solving and software development, here are three posts that capture my perspective 🤔
              </p>
              <ul>
                <li>
                  <Link href="/blog/2023-06-04-simple-problems-solved-llm-style" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Simple problems solved LLM style
                  </Link>
                  {' '}– A look at simple problems from the point of view of an LLM. Surprisingly insightful 🤖
                </li>
                <li>
                  <Link href="/blog/2018-12-08-innovation-isnt-done-in-crowds" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Innovation isn&apos;t done in crowds
                  </Link>
                  {' '}– Rather snarky, but still something I believe in. 💡
                </li>
                <li>
                  <Link href="/blog/2018-12-08-start-with-why-category-theory" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Start with why; Category theory
                  </Link>
                  {' '}– Budding first principles thinking from a young engineer :) 🎯
                </li>
              </ul>
              <p>
                I&apos;ve been humbled by failure many times—and I&apos;ve come to see that truly understanding the world <b>for what it is</b>, not what you want it to be, is a superpower.
              </p>
              <p>
                Talk is cheap. Here is an example of what I can do:
              </p>
              <div style={{position: 'relative', paddingBottom: '106.29921259842519%', height: 0, margin: '0 auto', width: '50%'}}>
                <iframe src="https://www.loom.com/embed/17b583fa11ea4e88960b2d19a7def961?sid=0d99e7bf-5d68-467c-ad85-e9caa986f066" frameBorder="0" allowFullScreen style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}></iframe>
              </div>
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="md:pl-10">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-[#9A5BFF] to-pink-400 bg-clip-text text-transparent">
              Recent Blog Posts
            </h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-[#9A5BFF] dark:group-hover:text-[#9A5BFF] transition-colors leading-relaxed">
                      {post.title}
                    </h3>
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

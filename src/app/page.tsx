import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPostsData().slice(0, 5); // Get 5 most recent posts

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 row-start-2 items-center sm:items-start w-full max-w-6xl">
        {/* Profile Section */}
        <section className="flex flex-col sm:flex-row gap-8 items-center sm:items-start w-full">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-black/[.08] dark:border-white/[.145]">
            <Image
              src="/profile.jpg"
              alt="Profile picture"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <h1 className="text-4xl font-bold">Rune Dohrn</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              Hey, I’m Rune! I love building products that people actually enjoy using. I’m always thinking about how great design, technology, and product decisions shape better software.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              <a
                href="https://github.com/dr0l3"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
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
                href="https://www.linkedin.com/in/rune-dørn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
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
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 w-full">
          {/* Guide Section */}
          <section className="w-full">
            <h2 className="text-2xl font-bold mb-4">Working Together</h2>
            <div className="prose dark:prose-invert">
              <p>
                I believe in building software that scales both technically and organizationally. My approach combines deep technical expertise with practical business understanding.
              </p>
              <p>
                If you&apos;re interested in my perspective on building scalable teams, read my thoughts on{' '}
                <Link href="/blog/2023-01-30-scaling-software-team-productivity" className="text-blue-600 dark:text-blue-400 hover:underline">
                  scaling software team productivity
                </Link>. 
              </p>
              <p>
                For insights into handling growth and enterprise needs, check out my post on{' '}
                <Link href="/blog/2023-01-31-scaling-to-large-customers" className="text-blue-600 dark:text-blue-400 hover:underline">
                  scaling to large customers
                </Link>.
              </p>
              <p>
                I also write about technical leadership and how to make better decisions in software organizations. You can read more about this in my post on{' '}
                <Link href="/blog/2023-02-01-scaling-decision-making" className="text-blue-600 dark:text-blue-400 hover:underline">
                  scaling decision-making
                </Link>.
              </p>
            </div>
          </section>

          {/* Blog Posts Section */}
          <section className="w-full">
            <h2 className="text-2xl font-bold mb-6">Recent Blog Posts</h2>
            <div className="grid gap-4">
              {posts.map(({ id, title, date }) => (
                <Link 
                  key={id} 
                  href={`/blog/${id}`}
                  className="block p-4 rounded-lg border border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a]"
                >
                  <h3 className="text-lg font-semibold mb-1">{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </Link>
              ))}
            </div>
            <Link 
              href="/blog"
              className="inline-block mt-4 text-sm font-medium hover:underline"
            >
              View all posts →
            </Link>
          </section>
        </div>
      </main>

      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}

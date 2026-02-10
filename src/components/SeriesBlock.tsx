import Link from 'next/link';

const SERIES = [
  { slug: '2026-01-07-weight-education', title: 'Education as weightlifting' },
  { slug: '2026-01-08-the-learning-rate-problem', title: 'The learning rate problem' },
  { slug: '2026-01-09-teachers-digital-education', title: 'What 73 teachers told me about AI and the web in education' },
  { slug: '2026-01-10-the-attention-problem', title: 'The attention and motivation problem' },
  { slug: '2026-01-16-the-reuse-problem', title: 'The reuse problem' },
] as const;

export type SeriesSlug = (typeof SERIES)[number]['slug'];

export default function SeriesBlock({ current }: { current: SeriesSlug }) {
  return (
    <div className="my-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200">
      <div className="font-semibold">Series: Education problems (5 posts)</div>
      <div className="mt-1">
        This post is part of a short series on constraints in education and what an instrumented classroom could look like:
      </div>
      <ul className="mt-2 list-disc pl-5">
        {SERIES.map((item) => (
          <li key={item.slug}>
            {item.slug === current ? (
              <strong>{item.title}</strong>
            ) : (
              <Link href={`/blog/posts/${item.slug}`}>{item.title}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


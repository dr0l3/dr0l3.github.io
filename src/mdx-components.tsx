import type { MDXComponents } from 'mdx/types';
import Example from '@/components/example';
import SeriesBlock from '@/components/SeriesBlock';
import Image from 'next/image';
import Link from 'next/link';

// This file is required to use MDX in `app` directory
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    SeriesBlock,
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4 text-blue-500">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-3 text-blue-500">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-2 text-blue-500">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mb-1 text-blue-500">{children}</h4>
    ),
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100 dark:bg-gray-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
        {children}
      </td>
    ),
    pre: ({ children, ...props }) => (
      <pre className="relative overflow-x-auto p-4 bg-gray-900 rounded-lg my-4" {...props}>
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => {
      const hasLang = /language-[a-z]{1,}/.test(className || '');
      return hasLang ? (
        <code className={className} {...props}>
          {children}
        </code>
      ) : (
        <code className="bg-gray-200 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
          {children}
        </code>
      );
    },
    Example,
    img: (props) => (
      <Image
        {...props}
        alt={props.alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
      />
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }
      if (href?.startsWith('#')) {
        return <a href={href} {...props}>{children}</a>;
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
    ...components,
  }
} 
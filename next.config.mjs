import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypePrettyCode from 'rehype-pretty-code'

const prettyCodeOptions = {
  theme: 'github-dark'
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'metadata' }]],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Enable static exports for GitHub Pages
   */
  output: "export",

  /**
   * Set base path to your GitHub repository name
   * Since this is username.github.io repository, we use empty string
   */
  basePath: "",

  /**
   * Preserve existing page extensions configuration
   */
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  /**
   * Configure images
   * - Disable optimization for static export
   * - Keep remote patterns for external images
   */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
}

export default withMDX(nextConfig)

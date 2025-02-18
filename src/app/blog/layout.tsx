export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          {children}
        </article>
      </div>
    </div>
  )
} 
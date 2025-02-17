import { getAllPostIds, getPostData } from '@/lib/posts';

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-3xl mx-auto">
        <article className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">{postData.title.charAt(0).toUpperCase() + postData.title.slice(1)}</h1>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            {new Date(postData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div 
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
            className="mt-8"
          />
        </article>
      </div>
    </div>
  );
} 
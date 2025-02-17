import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'jekyll/_posts');

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

function getDateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (match) {
    const [, year, month, day] = match;
    // Ensure month and day are two digits
    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');
    return `${year}-${paddedMonth}-${paddedDay}`;
  }
  return '';
}

function cleanFrontmatter(content: string): string {
  // Remove any empty frontmatter sections
  return content.replace(/---\s*---/g, '');
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = cleanFrontmatter(fs.readFileSync(fullPath, 'utf8'));

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Get date from frontmatter or filename
    const date = matterResult.data.date || getDateFromFilename(fileName);
    const title = matterResult.data.title || id.split('-').slice(3).join(' ');

    // Combine the data with the id
    return {
      id,
      date,
      title,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = cleanFrontmatter(fs.readFileSync(fullPath, 'utf8'));

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Get date from frontmatter or filename
  const date = matterResult.data.date || getDateFromFilename(`${id}.md`);
  const title = matterResult.data.title || id.split('-').slice(3).join(' ');

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    date,
    title,
  };
} 
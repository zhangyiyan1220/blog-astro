import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** 全站唯一的文章出口：过滤草稿 + 按日期倒序。 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );
}

export function formatDate(date: Date | string, withYear = true): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return withYear ? `${year} 年 ${month} 月 ${day} 日` : `${month} 月 ${day} 日`;
}

export function formatShortDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getUTCFullYear()}.${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;
}

/** 从正文里取一段纯文本摘要，用于文章卡片。 */
export function plainText(body = ''): string {
  return body
    .replace(/^---[\s\S]*?---/, '')
    .replace(/[#>*_`~\[\]()!-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 110);
}

import rss from '@astrojs/rss';
import { getPublishedPosts, plainText } from '../lib/posts';
import { SITE } from '../consts';

export async function GET() {
  const posts = await getPublishedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: `${SITE.siteUrl}${SITE.base}`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || plainText(post.body),
      pubDate: post.data.date,
      link: `posts/${post.id}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}

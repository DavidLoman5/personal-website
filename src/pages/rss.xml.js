import rss from '@astrojs/rss';
import { SITE } from '../config';
import { getPosts } from '../lib/content';

export async function GET(context) {
  const posts = await getPosts();

  return rss({
    title: `${SITE.title} — Blog`,
    description: SITE.description,
    // context.site 來自 astro.config.mjs 的 site
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary ?? '',
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>zh-Hant</language>',
  });
}

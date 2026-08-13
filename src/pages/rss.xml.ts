import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getPosts } from '../lib/content';

export async function GET(context: APIContext) {
  // context.site 來自 astro.config.mjs 的 site。沒設定的話 RSS 裡的連結會變成
  // 相對路徑,訂閱端點不開 —— 與其靜默產出壞掉的 feed,不如直接讓建置失敗。
  if (!context.site) {
    throw new Error('astro.config.mjs 少了 site 設定,RSS 需要它才能組出絕對網址');
  }

  const posts = await getPosts();

  return rss({
    title: `${SITE.title} — Blog`,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      // 後台清空欄位存的是空字串,用 || 才接得住
      description: post.data.summary?.trim() || '',
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>zh-Hant</language>',
  });
}

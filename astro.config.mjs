// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 部署後把 site 換成你的正式網址(例如 Netlify 給的 https://xxx.netlify.app)
// 這會讓 RSS、canonical 連結等使用正確的網域。
export default defineConfig({
  site: 'https://davidloman.netlify.app',
  // 頁面實際位置是 /goals/,連結若寫 /goals 每次點擊都要先吃一次 301 轉址。
  // 直接產出帶斜線的連結,省掉那一趟(舊的 /goals 連結仍會由 Netlify 轉過來)。
  trailingSlash: 'always',
  // 連結一進入畫面就先把該頁抓好,點下去幾乎是瞬間換頁(全站不到 90KB,可以放心全抓)
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  // 樣式加了設計系統之後已經超過 10KB,再全部內嵌就是「每一頁都重載一次同樣的 CSS、
  // 而且一次都快取不到」。改回 'auto':大的抽成 /_astro/*.css(netlify.toml 給它一年
  // immutable 快取,第二頁起完全免費),小的仍然內嵌。
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});

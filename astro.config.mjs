// @ts-check
import { defineConfig } from 'astro/config';

// 部署後把 site 換成你的正式網址(例如 Netlify 給的 https://xxx.netlify.app)
// 這會讓 RSS、canonical 連結等使用正確的網域。
export default defineConfig({
  site: 'https://example.netlify.app',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});

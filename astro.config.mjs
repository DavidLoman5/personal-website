// @ts-check
import { defineConfig } from 'astro/config';

// 部署後把 site 換成你的正式網址(例如 Netlify 給的 https://xxx.netlify.app)
// 這會讓 RSS、canonical 連結等使用正確的網域。
export default defineConfig({
  site: 'https://davidloman.netlify.app',
  // 連結一進入畫面就先把該頁抓好,點下去幾乎是瞬間換頁(全站不到 90KB,可以放心全抓)
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  // CSS 只有 ~5KB,直接內嵌進 HTML,省掉一次會擋住首次繪製的請求
  // (預設 'auto' 超過 4KB 就會externalize,剛好被我們新增的樣式推過門檻)
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});

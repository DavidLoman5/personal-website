# CLAUDE.md

給在這個 repo 工作的 Claude Code 的專案說明。

## 這是什麼

Felix 的個人網站 —— 靜態網站,放目標、心得(blog)、作品、關於我。使用者希望能**直接在網站上發文**,所以搭配了瀏覽器後台編輯器。

- 線上網址:https://davidloman.netlify.app
- 後台:https://davidloman.netlify.app/admin
- GitHub:DavidLoman5/personal-website(push 到 `main` → Netlify 自動部署)

## 技術棧

- **Astro 5**(靜態輸出),TypeScript。整站零 hydration,唯一的 client JS 是 prefetch、主題切換與 View Transitions。
- 整合:`@astrojs/sitemap`(自動產 `sitemap-index.xml`)、`@astrojs/rss`(`src/pages/rss.xml.js`)。
- **Decap CMS** 當後台(`public/admin/`),GitHub backend + Netlify OAuth 登入。
  - 注意:一開始用的是 Sveltia CMS,但它**只有簡體中文介面**,使用者不要,已改成 Decap(有繁體 `zh_Hant` 介面)。**除非使用者要求,不要換回 Sveltia。**
- 部署在 **Netlify**(`netlify.toml`:build `npm run build`、publish `dist`)。

## 常用指令

```bash
npm install        # 安裝套件
npm run dev        # 本機開發,http://localhost:4321
npm run build      # 建置到 dist/(改動後請跑這個確認無錯)
npm run preview    # 預覽 build 結果
```

驗證改動:`npm run build` 要成功;需要看畫面時用 `npm run dev` 開瀏覽器逐頁檢查。

## 專案結構

- `src/config.ts` —— 網站標題、自介、社群連結、導覽列。要改站名/自介先看這裡。
- `src/content.config.ts` —— 內容集合(blog / goals / projects)的欄位 schema(Zod)。
- `src/content/` —— 所有內容(Markdown):
  - `blog/`、`goals/`、`projects/` 各是一個集合;`about.md`(關於我)和 `home.md`(首頁封面那句名言)是單一檔案,被對應頁面直接 import,**不是** collection,所以不用寫進 `content.config.ts`,只要在 `public/admin/config.yml` 的 `pages` 集合裡有對應項目。
- `src/styles/global.css` —— **設計系統的單一來源**:`--space-*`、`--text-*`、`--radius-*`、`--transition-*`、色彩與 `--grad` 漸層、狀態色 token,以及 `.card` / `.row-link` / `.btn` / `.tag` / `.prose` 等共用樣式。**新增樣式前先來這裡找有沒有現成的**,不要再在元件裡寫死 rem 數值。
- `src/lib/` —— 沒有畫面的共用邏輯:
  - `goals.ts` —— `STATUS_LABEL` / `TERM_LABEL` / `sortGoals()` / `goalProgress()`。目標的狀態文字**只在這裡定義**。
  - `format.ts` —— `formatDate` / `formatMonth` / `isoDate` / `readingTime`。日期一律走這裡(統一 `zh-TW` 且固定 `timeZone: 'UTC'`,否則建置機器時區會讓日期差一天)。
  - `content.ts` —— `getPosts()` / `getProjects()`(已含 draft 過濾與排序)、`getTagMap()`。**取內容用這些,不要各頁自己 `getCollection` 再過濾一次。**
- `src/layouts/` —— `BaseLayout`(共用外框、head 的 SEO/OG/canonical、防閃爍主題腳本、`<ClientRouter />`)、`PostLayout`(blog / goals / projects **三種詳情頁共用**,靠 `back`、`collection`、`slot="meta"` 等 props 調整)。
- `src/components/` —— `Header`、`Footer`、`ThemeToggle`、`PostCard`、`EditButton`、`StatusBadge`、`GoalItem`、`TagList`。
  - `EditButton` 是全站每頁那顆「編輯 / 新增」按鈕,連到 `/admin/#/collections/<集合>/entries/<檔名>`(不給 `entry` 就是 `/new`)。**`entry` 一定要用內容的檔名(Astro 的 `entry.id`)**,才對得上後台的 slug。它帶 `data-astro-prefetch="false"`,不要拿掉——全站是 `prefetchAll`,不然每顆編輯鈕都會去預抓 `/admin/`。
- `src/pages/` —— 路由。`blog/`、`goals/`、`projects/` 的 `[...slug].astro` 用 `getStaticPaths` 產生詳情頁;另有 `404.astro`、`tags/index.astro`、`tags/[tag].astro`(標籤由 blog + projects 聚合)、`rss.xml.js`。
- `public/admin/` —— 後台:`index.html`(載入 Decap CMS)、`config.yml`(集合與欄位定義,須與 `content.config.ts` 對齊)。
- `public/uploads/` —— 後台上傳的圖片。

## 重要慣例

- **語言**:網站標題與導覽/頁面標題用**英文**;文章、目標、作品的**內文保留使用者的中文**。後台介面是**繁體中文**。維持這個混合方式,不要擅自把內文翻成英文。
- **改內容欄位時**:`src/content.config.ts`(給網站讀)和 `public/admin/config.yml`(給後台用)兩邊都要同步改,否則後台存的資料網站會讀不到 / 驗證失敗。
- **後台清空欄位存的是空字串 `""`,不是把欄位拿掉**。所以 schema 用 `optionalDate` / `optionalText` / `optionalUrl` 這幾個 preprocess 包過再驗;頁面上取值用 `x?.trim() || fallback`,**不要用 `??`**(它接不住空字串,會渲染出空標題或一對空引號)。
- **日期**:datetime 欄位用 `YYYY-MM-DD` 格式;schema 用 `z.coerce.date()`;顯示一律用 `src/lib/format.ts`。
- **目標狀態**:`todo` / `doing` / `done`;`term` 為 `short` / `long`。首頁只顯示未完成的目標。狀態徽章用 `<StatusBadge>`,顏色是 `--status-*` token(深淺主題各一組,都過 WCAG AA)。
- **Astro 模板裡不能在標籤內寫 `/* */` 註解** —— 那不是註解,會把後面的屬性吃掉(曾經因此讓 `class` 整個失效)。註解要寫成 `{/* ... */}` 並放在標籤外面。
- 使用者環境是 Windows + PowerShell;Node 已安裝。git push 已有快取憑證可直接推。

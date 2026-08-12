# CLAUDE.md

給在這個 repo 工作的 Claude Code 的專案說明。

## 這是什麼

Felix 的個人網站 —— 靜態網站,放目標、心得(blog)、作品、關於我。使用者希望能**直接在網站上發文**,所以搭配了瀏覽器後台編輯器。

- 線上網址:https://davidloman.netlify.app
- 後台:https://davidloman.netlify.app/admin
- GitHub:DavidLoman5/personal-website(push 到 `main` → Netlify 自動部署)

## 技術棧

- **Astro 5**(靜態輸出),TypeScript。
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
  - `blog/`、`goals/`、`projects/` 各是一個集合;`about.md` 是單一頁面(被 `src/pages/about.astro` 直接 import)。
- `src/layouts/` —— `BaseLayout`(共用外框、含防閃爍的主題腳本)、`PostLayout`(單篇文章)。
- `src/components/` —— `Header`、`Footer`、`ThemeToggle`、`PostCard`。
- `src/pages/` —— 路由。`blog/[...slug].astro` 與 `goals/[...slug].astro` 用 `getStaticPaths` 動態產生每篇/每個目標的詳情頁。
- `public/admin/` —— 後台:`index.html`(載入 Decap CMS)、`config.yml`(集合與欄位定義,須與 `content.config.ts` 對齊)。
- `public/uploads/` —— 後台上傳的圖片。

## 重要慣例

- **語言**:網站標題與導覽/頁面標題用**英文**;文章、目標、作品的**內文保留使用者的中文**。後台介面是**繁體中文**。維持這個混合方式,不要擅自把內文翻成英文。
- **改內容欄位時**:`src/content.config.ts`(給網站讀)和 `public/admin/config.yml`(給後台用)兩邊都要同步改,否則後台存的資料網站會讀不到 / 驗證失敗。
- **日期**:datetime 欄位用 `YYYY-MM-DD` 格式;schema 用 `z.coerce.date()`。
- **目標狀態**:`todo` / `doing` / `done`;`term` 為 `short` / `long`。首頁只顯示未完成的目標。
- 使用者環境是 Windows + PowerShell;Node 已安裝。git push 已有快取憑證可直接推。

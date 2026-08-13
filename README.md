# Felix-Chen's Website

用 [Astro](https://astro.build/) 打造的個人網站,包含 **目標(Goals)、心得(Blog)、作品(Projects)、關於我(About)**,並內建後台編輯器可直接在瀏覽器發文。

🔗 線上網址:<https://davidloman.netlify.app>
📝 後台編輯器:<https://davidloman.netlify.app/admin>

## 本機預覽

```bash
npm install      # 第一次先安裝套件
npm run dev      # 啟動開發伺服器
```

然後打開 <http://localhost:4321> 就能看到網站。

## 建置(產出正式檔案)

```bash
npm run build    # 產出到 dist/
npm run preview  # 預覽 build 後的結果
```

## 內容放在哪裡

所有內容都是 Markdown 檔,放在 `src/content/`:

| 區塊   | 資料夾                  |
| ------ | ----------------------- |
| 心得   | `src/content/blog/`     |
| 目標   | `src/content/goals/`    |
| 作品   | `src/content/projects/` |
| 關於我 | `src/content/about.md`  |

你可以直接編輯這些檔案,也可以用下面的後台編輯器。內容欄位的規則定義在 `src/content.config.ts`。

## 怎麼寫一篇新文章

有兩種方式,結果完全一樣(都是在 `src/content/` 產生一個 Markdown 檔)。**平常建議用方法 A。**

### 方法 A:在網站後台寫(推薦,不用碰程式碼)

1. 打開 **<https://davidloman.netlify.app/admin>**,用 GitHub 帳號登入。
2. 左側選 **心得**(或 目標 / 作品),按 **New 心得**。
3. 填標題、日期、內文。要插圖就按圖片欄位上傳,圖片會自動存到 `public/uploads/`。
4. 按 **Publish → Publish now**。

按下去之後會自己跑完:Decap 把 Markdown 提交到 GitHub → Netlify 偵測到更新 → 重新建置上線。**大約 1~2 分鐘後重新整理就會看到。**

> 沒馬上看到是正常的,頁面有 30 秒的瀏覽器快取。重新整理(Ctrl+F5)就會立刻拿到最新版。

### 方法 B:在電腦上直接寫檔案

在 `src/content/blog/` 新增一個 `.md` 檔,檔名就是網址(例如 `my-first-post.md` → `/blog/my-first-post/`)。開頭那段 `---` 包起來的是欄位設定,下面才是內文:

```markdown
---
title: 我的第一篇文章
date: 2026-08-12
summary: 一句話簡介,會顯示在文章列表上
tags: ['隨筆', '學習']
draft: false
---

這裡開始寫內文,用一般的 Markdown 語法就好。

## 這是小標題

- 條列一
- 條列二
```

寫完 `npm run dev` 看一下,沒問題就 `git push`,Netlify 會自動部署。

### ⚠️ 檔名就是網址

`my-first-post.md` 就是 `/blog/my-first-post/`,兩者永遠綁在一起。有兩件事要記得:

- **在後台改標題,網址不會跟著變。** 後台只有在「新增」那一刻用標題產檔名,之後改標題不會 rename 檔案。所以檔名跟標題對不上是正常的,不用特地去修。
- **真的要改網址就改檔名,同時在 `netlify.toml` 補一條 301。** 不補的話,舊網址(可能已經傳給別人、或被搜尋引擎收錄)會直接變 404。檔案末端有現成的 `[[redirects]]` 範例可以照抄。

### 各區塊可以填的欄位

欄位規則定義在 `src/content.config.ts`,填錯建置會失敗並告訴你哪裡錯。日期一律用 `YYYY-MM-DD`。

**心得 Blog**(`src/content/blog/`)

| 欄位      | 必填 | 說明                                    |
| --------- | ---- | --------------------------------------- |
| `title`   | ✅   | 標題                                    |
| `date`    | ✅   | 發布日期                                |
| `summary` |      | 列表上顯示的一句話簡介                  |
| `tags`    |      | 標籤陣列,如 `['隨筆']`                 |
| `cover`   |      | 封面圖路徑,如 `/uploads/xxx.jpg`       |
| `draft`   |      | 設 `true` 就是草稿,不會出現在網站上    |

**目標 Goals**(`src/content/goals/`)

| 欄位          | 必填 | 說明                                        |
| ------------- | ---- | ------------------------------------------- |
| `title`       | ✅   | 目標名稱                                    |
| `term`        |      | `short` 短期 / `long` 長期(預設 `short`)  |
| `status`      |      | `todo` / `doing` / `done`(預設 `todo`)    |
| `order`       |      | 數字,越小越前面                            |
| `target_date` |      | 預計完成日                                  |

> 首頁只會顯示**還沒完成**的目標;完成的改成 `done` 後仍會留在 `/goals/` 頁面。

**作品 Projects**(`src/content/projects/`)

| 欄位      | 必填 | 說明                     |
| --------- | ---- | ------------------------ |
| `title`   | ✅   | 作品名稱                 |
| `date`    | ✅   | 日期                     |
| `summary` |      | 簡介                     |
| `tags`    |      | 標籤陣列                 |
| `cover`   |      | 封面圖                   |
| `link`    |      | 專案連結(外部網址)     |
| `order`   |      | 數字,越小越前面         |

### 關於後台

後台使用 [Decap CMS](https://decapcms.org/)(繁體中文介面),設定檔在 `public/admin/config.yml`。

⚠️ **要新增或修改欄位時,`src/content.config.ts` 和 `public/admin/config.yml` 兩邊都要改**,否則後台存的資料網站會讀不到。

## 想改網站標題、自介、社群連結?

編輯 `src/config.ts`。

## 部署(已完成,供日後參考)

網站已部署在 Netlify,連動 GitHub repo `DavidLoman5/personal-website`,**push 到 `main` 就會自動重新部署**。

當初的設定步驟:

1. 專案推到 GitHub。
2. 在 [Netlify](https://www.netlify.com/) 連接該 repo(建置指令 `npm run build`、發佈目錄 `dist`,已寫在 `netlify.toml`)。
3. 設定後台登入用的 GitHub OAuth:
   - 在 GitHub 建 OAuth App,Authorization callback URL 填 `https://api.netlify.com/auth/done`。
   - 在 Netlify 的 **Access & security → OAuth** 安裝 GitHub provider,貼上 Client ID / Secret。
4. 把 `astro.config.mjs` 裡的 `site` 設為正式網址(目前為 `https://davidloman.netlify.app`)。

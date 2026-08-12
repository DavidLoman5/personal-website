# David 的個人網站

用 [Astro](https://astro.build/) 打造的個人網站,包含 **目標、心得(Blog)、作品、關於我**,並內建後台編輯器可直接在瀏覽器發文。

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

| 區塊   | 資料夾                 |
| ------ | ---------------------- |
| 心得   | `src/content/blog/`    |
| 目標   | `src/content/goals/`   |
| 作品   | `src/content/projects/`|
| 關於我 | `src/content/about.md` |

你可以直接編輯這些檔案,也可以用下面的後台編輯器。

## 後台編輯器(在網站上直接發文)

部署到 Netlify 並設定好 GitHub 登入後,到 **`你的網址/admin`**,用 GitHub 帳號登入,就能用圖形介面寫文章、插圖、按存檔即發布 —— 不需要碰程式碼。

設定檔在 `public/admin/config.yml`。

## 想改網站標題、自介、社群連結?

編輯 `src/config.ts`。

## 部署

1. 把這個專案推到 GitHub。
2. 在 [Netlify](https://www.netlify.com/) 連接該 repo,建置指令 `npm run build`、發佈目錄 `dist`(已寫在 `netlify.toml`)。
3. 設定後台登入用的 GitHub OAuth(見專案討論紀錄的步驟)。
4. 記得把 `astro.config.mjs` 裡的 `site` 換成你的正式網址。

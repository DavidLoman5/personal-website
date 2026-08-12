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

## 後台編輯器(在網站上直接發文)

後台使用 [Decap CMS](https://decapcms.org/)(繁體中文介面)。到 **<https://davidloman.netlify.app/admin>**,用 GitHub 帳號登入,就能用圖形介面寫文章、插圖、按存檔即發布 —— 不需要碰程式碼。

發文流程:在 `/admin` 存檔 → Decap 把 Markdown 提交到 GitHub → Netlify 偵測到更新 → 自動重新建置並上線(約 1~2 分鐘)。

後台設定檔在 `public/admin/config.yml`。上傳的圖片會存到 `public/uploads/`。

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

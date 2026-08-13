// 後台(Decap CMS)相關的常數與連結組法。
// 網址格式就是 Decap 的路由,定義在 public/admin/config.yml。

/** config.yml 裡的集合名稱 —— 收成聯集型別,打錯字建置時就會被抓到 */
export type CmsCollection = 'blog' | 'goals' | 'projects' | 'pages';

/**
 * 後台編輯連結。
 * `entry` 要用內容的**檔名**(Astro 的 `entry.id`),才對得上 Decap 的 slug;
 * 省略就是「新增一筆」。
 */
export function adminUrl(collection: CmsCollection, entry?: string): string {
  return entry
    ? `/admin/#/collections/${collection}/entries/${entry}`
    : `/admin/#/collections/${collection}/new`;
}

// 日期格式化以前在四個檔案各寫一次,還混用了 zh-TW 與 en-US ——
// 同一個網站上文章寫「2026年8月1日」、目標寫「Aug 2026」。統一走這裡。

// frontmatter 的 `2026-08-01` 會被 z.coerce.date() 解析成 UTC 午夜。
// 不指定 timeZone 的話,建置機器只要在 UTC 以西(例如 Netlify 的 UTC 本身沒事,
// 但本機在美洲就會),顯示出來的日期會少一天。
const TZ = 'UTC';

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: TZ,
  });
}

/** 只到月份 —— 目標的 target date 用 */
export function formatMonth(date: Date): string {
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    timeZone: TZ,
  });
}

/** <time datetime="..."> 要的機器可讀格式 */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * 粗估閱讀時間。中文按字數算(每分鐘約 350 字),英文按單字數(每分鐘約 220 字);
 * 中英混排就兩邊相加,不會因為中文沒有空格而被算成「一個字」。
 */
export function readingTime(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, '') // 程式碼區塊不算
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, '') // 連結與圖片語法
    .replace(/[#>*_`~-]/g, '');

  const cjk = (text.match(/[一-鿿぀-ヿ]/g) ?? []).length;
  const words = (text.replace(/[一-鿿぀-ヿ]/g, ' ').match(/[A-Za-z0-9]+/g) ?? [])
    .length;

  return Math.max(1, Math.round(cjk / 350 + words / 220));
}

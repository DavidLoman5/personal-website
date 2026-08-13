// 網站基本資料 —— 想改網站標題、自介、社群連結,改這裡就好。
export const SITE = {
  title: "Felix-Chen's Website",
  // 首頁大標下方那句話
  tagline: 'Tracking my goals and what I am working on.',
  // 關於我頁面與 footer 用得到
  author: 'Felix Chen',
  description: "Felix Chen's personal website — goals, notes, and projects.",
  // 你的聯絡方式與社群(沒有的就留空字串,會自動不顯示)
  email: 'felixchen030496@gmail.com',
  github: 'https://github.com/DavidLoman5',
  // 分享到社群時的預設預覽圖(放在 public/,用站內絕對路徑)
  ogImage: '/og.png',
};

// 導覽列項目
export const NAV_LINKS = [
  // 結尾的斜線是刻意的 —— 頁面實際位置就是 /goals/,少了它每次點擊都要多吃一次轉址
  { href: '/', label: 'Home' },
  { href: '/goals/', label: 'Goals' },
  { href: '/blog/', label: 'Blog' },
  { href: '/projects/', label: 'Projects' },
  { href: '/about/', label: 'About' },
];

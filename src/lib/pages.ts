// home.md 與 about.md 各只有一份,不是 collection,所以走直接 import。
// 這種 import 的 frontmatter 在 TypeScript 眼裡是 any —— config.yml 改個欄位名
// 不會有任何警告,要到網站上看到空白才發現。這裡補上型別,
// 讓 config.yml 的 `pages` 欄位在程式端有唯一一份對應定義。
//
// 欄位改名時,這裡與 public/admin/config.yml 的 `pages` 要一起改。
import { frontmatter as homeFrontmatter } from '../content/home.md';
import {
  Content as AboutContent,
  frontmatter as aboutFrontmatter,
} from '../content/about.md';

/** src/content/home.md —— 首頁封面那句名言 */
export interface HomeFrontmatter {
  quote?: string;
}

/** src/content/about.md —— 關於我 */
export interface AboutFrontmatter {
  title?: string;
  photo?: string;
}

export const home = homeFrontmatter as HomeFrontmatter;
export const about = aboutFrontmatter as AboutFrontmatter;
export { AboutContent };

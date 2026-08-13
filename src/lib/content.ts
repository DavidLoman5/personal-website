import { getCollection, type CollectionEntry } from 'astro:content';
import { sortGoals, type Goal } from './goals';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

// draft 過濾以前在列表頁與詳情頁各寫一次,兩邊一旦不同步就會出現
// 「列表看不到、但網址打得開」的鬼頁面。集中在這裡。
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects', ({ data }) => !data.draft);
  return projects.sort(
    (a, b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime(),
  );
}

export async function getGoals(): Promise<Goal[]> {
  const goals = await getCollection('goals', ({ data }) => !data.draft);
  return sortGoals(goals);
}

export type TaggedEntry =
  | { kind: 'post'; entry: Post }
  | { kind: 'project'; entry: Project };

export interface TagGroup {
  /** 顯示用的原始標籤文字(第一次出現時的寫法) */
  label: string;
  items: TaggedEntry[];
}

/**
 * 標籤 → 網址片段。
 * - 一律小寫:Windows 與 macOS 的檔案系統不分大小寫,`Astro` 與 `astro` 會產到
 *   同一個資料夾互相覆蓋 —— 本機只剩一頁、Netlify(Linux)卻有兩頁,是那種
 *   「本機看起來正常」的難查問題。
 * - 空白與檔名保留字元換成 `-`:`/` 會多切出一層路徑讓連結 404,
 *   `: * ? " < > |` 在 Windows 上會直接讓建置失敗。
 * 中文不受這兩條影響,所以中文標籤的網址維持原樣。
 */
export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[\\/:*?"<>|#%]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** 把 blog 與 projects 的標籤攤平成一張表,標籤頁與標籤總覽都吃這個 */
export async function getTagMap(): Promise<Map<string, TagGroup>> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const map = new Map<string, TagGroup>();

  const addAll = (tags: string[], item: TaggedEntry) => {
    // 同一篇重複填同一個標籤(或只差大小寫的同一個標籤)只算一次,
    // 否則標籤頁會把同一篇列兩次、總覽的篇數也會多算。
    const seen = new Set<string>();
    for (const tag of tags) {
      const slug = tagSlug(tag);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      const group = map.get(slug);
      if (group) group.items.push(item);
      else map.set(slug, { label: tag.trim(), items: [item] });
    }
  };

  for (const entry of posts) addAll(entry.data.tags, { kind: 'post', entry });
  for (const entry of projects) addAll(entry.data.tags, { kind: 'project', entry });

  return map;
}

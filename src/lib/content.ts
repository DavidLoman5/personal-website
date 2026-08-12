import { getCollection, type CollectionEntry } from 'astro:content';

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

export type TaggedEntry =
  | { kind: 'post'; entry: Post }
  | { kind: 'project'; entry: Project };

/** 把 blog 與 projects 的標籤攤平成一張表,標籤頁與標籤總覽都吃這個 */
export async function getTagMap(): Promise<Map<string, TaggedEntry[]>> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const map = new Map<string, TaggedEntry[]>();

  const add = (tag: string, item: TaggedEntry) => {
    const key = tag.trim();
    if (!key) return;
    const list = map.get(key);
    if (list) list.push(item);
    else map.set(key, [item]);
  };

  for (const entry of posts) entry.data.tags.forEach((t) => add(t, { kind: 'post', entry }));
  for (const entry of projects) {
    entry.data.tags.forEach((t) => add(t, { kind: 'project', entry }));
  }

  return map;
}

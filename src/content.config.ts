import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 後台把日期清空時,存下來的是空字串(target_date: "")而不是把欄位拿掉,
// 直接丟給 z.coerce.date() 會變成 Invalid Date 讓整個 build 失敗。
// 這裡把空值一律當成「沒填」。
const optionalDate = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.date().optional(),
);

// 心得 / Blog 文章
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 目標 / Goals
const goals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/goals' }),
  schema: z.object({
    title: z.string(),
    // short = 短期,long = 長期
    term: z.enum(['short', 'long']).default('short'),
    status: z.enum(['todo', 'doing', 'done']).default('todo'),
    order: z.number().default(0),
    target_date: optionalDate,
  }),
});

// 作品 / Projects
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    link: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, goals, projects };

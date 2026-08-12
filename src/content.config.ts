import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 後台把日期清空時,存下來的是空字串(target_date: "")而不是把欄位拿掉,
// 直接丟給 z.coerce.date() 會變成 Invalid Date 讓整個 build 失敗。
// 這裡把空值一律當成「沒填」。
const optionalDate = z.preprocess(
  (v) => (v === '' || v === null ? undefined : v),
  z.coerce.date().optional(),
);

// 同樣的道理:後台清空文字欄位存的是 ""。空字串丟給 .url() 會直接讓 build 失敗。
const optionalText = z.preprocess(
  (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
  z.string().optional(),
);
const optionalUrl = z.preprocess(
  (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
  z.string().url('請填完整網址,要包含 https://').optional(),
);

// 心得 / Blog 文章
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: optionalText,
    tags: z.array(z.string()).default([]),
    cover: optionalText,
    // 封面的文字說明,給看不到圖的人。沒填就當純裝飾圖(alt="")
    cover_alt: optionalText,
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
    draft: z.boolean().default(false),
  }),
});

// 作品 / Projects
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: optionalText,
    tags: z.array(z.string()).default([]),
    cover: optionalText,
    cover_alt: optionalText,
    link: optionalUrl,
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, goals, projects };

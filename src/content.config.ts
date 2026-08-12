import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    target_date: z.coerce.date().optional(),
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

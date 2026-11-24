import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// 一篇文章 = 一个目录 + 一个 index.md，配图放在同一目录。
const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/index.md',
    generateId: ({ entry }) => entry.replace(/\/?index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
  }),
});

export const collections = { posts, pages };

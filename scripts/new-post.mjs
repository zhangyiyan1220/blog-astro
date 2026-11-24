#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith('--'));
const getOption = (name) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
};

const title = positional.join(' ').trim();
if (!title) {
  console.error('用法：npm run new -- "文章标题" [--tags 标签1,标签2]');
  process.exit(1);
}

function toSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const slug = toSlug(title) || `post-${Date.now()}`;
const tags = (getOption('tags') ?? '生活随笔')
  .split(/[,，]/)
  .map((tag) => tag.trim())
  .filter(Boolean);
const date = new Date().toISOString().slice(0, 10);

const dir = join(root, 'src', 'content', 'posts', slug);
const file = join(dir, 'index.md');
const content = `---
title: ${title}
description: ''
date: '${date}'
tags: [${tags.map((tag) => `'${tag}'`).join(', ')}]
draft: true
---

写点什么吧。
`;

await mkdir(dir, { recursive: true });
await writeFile(file, content, { flag: 'wx' }).catch((error) => {
  if (error.code === 'EEXIST') {
    console.error(`文章已存在：src/content/posts/${slug}/index.md`);
    process.exit(1);
  }
  throw error;
});

console.log(`已创建：src/content/posts/${slug}/index.md`);
console.log('记得填 description，并把 draft 改成 false 才会发布。');

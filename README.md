# 章亦颜的个人博客

基于 Astro 的静态博客，走「极简核心」路线：首页、文章、标签、归档、关于、404，外加 RSS、sitemap、robots 和深浅主题。

## 本地运行

需要 Node.js >= 22.23.4（本地已准备 24.14.0）。

```bash
npm install
npm run dev
```

打开 <http://localhost:4321/blog-astro/>。

```bash
npm run build     # 生成 dist/
npm run preview   # 预览构建结果
npm run check     # 类型检查
```

## 写新文章

```bash
npm run new -- "文章标题" --tags 随笔,记录
```

会在 `src/content/posts/<slug>/index.md` 生成一篇默认 `draft: true` 的草稿。填好 `description`、把 `draft` 改成 `false`，再 `git add . && git commit && git push` 即可自动上线。

约定：

- 一篇文章 = 一个目录 + 一个 `index.md`；目录名就是 URL 的 slug，建好后不要改。
- 配图放在同一目录，正文里写 `![](./cover.jpg)`，构建时会自动优化。
- `date` 加引号；草稿不会出现在首页、归档、标签、RSS 和 sitemap 中。

## 改文案

站名、简介、署名、GitHub 链接等集中在 `src/consts.ts`，不用改页面代码。

## 部署

推送到 `main` 后由 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。站点地址：<https://zhangyiyan1220.github.io/blog-astro/>

> 若使用其他仓库名，同步修改 `astro.config.mjs` 里的 `base`、`consts.ts` 里的 `siteUrl`、`public/robots.txt` 和 README 中的地址即可。

## 目录结构

```text
src/
├─ components/      导航、页脚、文章列表
├─ content/
│  ├─ pages/about.md
│  └─ posts/<slug>/index.md
├─ layouts/         基础布局、文章布局
├─ lib/posts.ts     全站统一的文章出口
├─ pages/           首页 / 归档 / 标签 / 关于 / 404 / rss.xml
├─ styles/global.css
├─ consts.ts
└─ content.config.ts
```

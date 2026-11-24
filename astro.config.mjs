import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 站点地址与子路径保持与 GitHub Pages 仓库一致。
// 部署到 https://zhangyiyan1220.github.io/blog-astro/ 时无需改动这里。
export default defineConfig({
  site: 'https://zhangyiyan1220.github.io',
  base: '/blog-astro/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});

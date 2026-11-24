/**
 * 站点文案集中在这里，改文字不用动页面代码。
 */
export const SITE = {
  title: '章亦颜的个人博客',
  shortTitle: 'zhangyiyan',
  description: '章亦颜的个人博客展示。记录生活、随手写的一些东西。',
  author: 'zhangyiyan',
  authorName: '章亦颜',
  role: '学生',
  intro: '学生，写点生活随笔。把普通的日子写下来，是这件小事的全部意义。',
  siteUrl: 'https://zhangyiyan1220.github.io',
  base: '/blog-astro/',
  github: 'https://github.com/zhangyiyan1220',
  email: '',
  lang: 'zh-CN',
} as const;

export const NAV = [
  { label: '首页', href: '/' },
  { label: '文章', href: '/archive/' },
  { label: '标签', href: '/tags/' },
  { label: '关于', href: '/about/' },
] as const;

/**
 * UI 文案字典（按 locale）
 * locale：'zh'（默认，中文页面）| 'en'（英文页面）
 */

export type Locale = 'zh' | 'en';

export interface UiStrings {
  htmlLang: string;
  ogLocale: string;
  siteTitle: string;                 // 无页面标题时的浏览器标题
  siteName: string;
  siteTagline: string;               // 页脚 / 首页副标题
  defaultDescription: string;
  search: string;                    // 顶栏搜索按钮
  searchAria: string;
  searchPlaceholder: string;
  searchZeroResults: string;
  searchManyResults: string;         // {x} 个结果
  searchOneResult: string;
  searchSearching: string;
  searchLoadMore: string;
  prev: string;
  next: string;
  home: string;                      // 面包屑首段
  homeHref: string;
  contentComingSoon: string;         // 空正文占位
  navAria: string;                   // 侧边栏 aria-label
  breadcrumbAria: string;
  prevnextAria: string;
  backToHome: string;                // 品牌链接 title
  themeToggle: string;
  menuToggle: string;                // 移动端侧边栏菜单按钮（aria-label）
  langToggle: string;                // 切换到另一语言的按钮文案
  notFoundTitle: string;
  notFoundBody: string;
  commentsTitle: string;             // 评论区标题
  commentsModerationNote: string;    // 审核提示（Cusdis 评论需后台审核后显示）
}

const zh: UiStrings = {
  htmlLang: 'zh-CN',
  ogLocale: 'zh_CN',
  siteTitle: 'Self custody · 简单安全的比特币自托管',
  siteName: 'Self custody',
  siteTagline: 'Self custody · 简单又安全的比特币自托管',
  defaultDescription:
    '面向非技术人群的比特币/加密货币自托管指南：掷骰子生成 BIP39 助记词、设置 passphrase、备份与使用冷钱包，简单又安全。',
  search: '搜索',
  searchAria: '搜索本站',
  searchPlaceholder: '搜索本站…',
  searchZeroResults: '没有找到结果',
  searchManyResults: '找到 {x} 个结果',
  searchOneResult: '找到 1 个结果',
  searchSearching: '搜索中…',
  searchLoadMore: '加载更多',
  prev: '← 上一篇',
  next: '下一篇 →',
  home: '首页',
  homeHref: '/zh',
  contentComingSoon: '内容待添加',
  navAria: '目录导航',
  breadcrumbAria: '面包屑',
  prevnextAria: '上一篇 / 下一篇',
  backToHome: '回到首页',
  themeToggle: '切换深浅色',
  menuToggle: '打开菜单',
  langToggle: 'EN',
  notFoundTitle: '页面不存在',
  notFoundBody: '这个页面不存在或已被移动。',
  commentsTitle: '评论',
  commentsModerationNote: '评论提交后经审核才会显示，感谢耐心等待。',
};

const en: UiStrings = {
  htmlLang: 'en',
  ogLocale: 'en_US',
  siteTitle: 'Self Custody for Humans · Bitcoin & Crypto Self-Custody Guide',
  siteName: 'Self custody',
  siteTagline: 'Self custody · Simple, safe Bitcoin self-custody',
  defaultDescription:
    'A practical guide to Bitcoin & crypto self-custody for non-geeks: generate a BIP39 seed phrase with dice, add a passphrase, and use a cold wallet — simple and safe.',
  search: 'Search',
  searchAria: 'Search this site',
  searchPlaceholder: 'Search this site…',
  searchZeroResults: 'No results found',
  searchManyResults: '{x} results found',
  searchOneResult: '1 result found',
  searchSearching: 'Searching…',
  searchLoadMore: 'Load more',
  prev: '← Previous',
  next: 'Next →',
  home: 'Home',
  homeHref: '/',
  contentComingSoon: 'Content coming soon',
  navAria: 'Table of contents',
  breadcrumbAria: 'Breadcrumb',
  prevnextAria: 'Previous / Next',
  backToHome: 'Back to home',
  themeToggle: 'Toggle dark mode',
  menuToggle: 'Open menu',
  langToggle: '中文',
  notFoundTitle: 'Page not found',
  notFoundBody: 'This page does not exist or has been moved.',
  commentsTitle: 'Comments',
  commentsModerationNote: 'Comments are reviewed before appearing. Thanks for your patience.',
};

export const UI: Record<Locale, UiStrings> = { zh, en };

export function ui(locale: Locale): UiStrings {
  return UI[locale] ?? UI.zh;
}

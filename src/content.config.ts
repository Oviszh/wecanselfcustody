import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 内容集合：
 *   docs    （中文）src/content/docs/      -> 路由 /zh/<slug>（中文统一带 zh 前缀）
 *   docs-en （英文）src/content/docs-en/   -> 路由 /<slug>（英文为默认语言，无前缀）
 * 两个目录结构完全镜像（同 id = 同一篇文章的两种语言）；展示路由经 nav.ts 的 routeFromId 去掉纯分组段。
 */

const docSchema = z.object({
  // 必填：页面 <title> 与面包屑末级标签
  title: z.string(),
  // SEO meta description / RSS 摘要
  description: z.string().optional(),
  // 发布日期 / 更新日期（RSS 与结构化数据用）
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  // 草稿不发布
  draft: z.boolean().optional().default(false),
  // 兄弟间排序（默认按 nav.ts 顺序）
  order: z.number().optional(),
  // 覆盖 nav.ts 的侧边栏显示标签
  sidebarLabel: z.string().optional(),
  // 侧边栏等宽字体（passphrase / electrum 等英文词）
  mono: z.boolean().optional(),
  // 手动覆盖上一篇 / 下一篇（路由路径）
  prev: z.string().optional(),
  next: z.string().optional(),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: docSchema,
});

const docsEn = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs-en' }),
  schema: docSchema,
});

export const collections = { docs, 'docs-en': docsEn };

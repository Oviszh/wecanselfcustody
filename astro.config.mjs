// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 部署域名（sitemap / RSS / canonical / OG 都依赖它）
  site: 'https://selfcustodyforhumans.com',
  output: 'static',
  // 干净 URL：/for-humans/create-wallet/random（无尾斜杠）
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      // 代码高亮主题，匹配现有深色代码块（.md pre { background:#222 }）
      theme: 'github-dark',
    },
  },
  integrations: [
    sitemap({
      // 中英文 hreflang 交叉链接：英文为默认语言（根路径），中文统一 /zh 前缀
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-CN' },
      },
    }),
  ],
});

// 把构建期生成的 Pagefind 索引同步到 public/pagefind，
// 这样 `astro dev` 也能直接服务 /pagefind/*，站内搜索在开发模式可用。
// （astro 在 build 时会把 public 复制到 dist，随后 postbuild 的 pagefind --site dist
//  会重新生成 dist/pagefind，最终产物始终正确；此脚本只为了让 dev 模式也能查。）
import { cpSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'dist/pagefind');
const dest = resolve(root, 'public/pagefind');

if (!existsSync(src)) {
  console.warn('[sync-pagefind] dist/pagefind 不存在，跳过（请先运行 build）。');
  process.exit(0);
}

cpSync(src, dest, { recursive: true });
console.log('[sync-pagefind] dist/pagefind -> public/pagefind 同步完成');

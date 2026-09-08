/**
 * 目录导航数据（真源）与辅助函数
 * 结构：
 *   for humans（强调区块，三节无编号）——纯视觉分组，URL 不含 for-humans 段（bare）
 *     创建钱包（主页 + 两个叶子：助记词 / passphrase）
 *     备份钱包
 *     使用钱包 -> 旧手机 / 硬件钱包
 *   thinkings
 *   Tools
 *
 * URL 方案（2026-09 起）：
 *   英文（默认语言）不带语言前缀；中文统一以 zh 为前缀。
 *   例：/create-wallet（EN）、/zh/create-wallet（ZH）、/thinkings/about-hww（EN）。
 *   for-humans 是纯分组，不出现在 URL 中。
 *   Tools 为语言中立（shared），任何语言下都是 /tools/...。
 *
 * 内容 id（src/content/docs|docs-en 下文件路径）含 for-humans/；
 * 展示路由用 routeFromId() 去掉该段，页面/RSS/语言互切统一走它。
 */

import type { Locale } from './ui';

export interface NavLeaf {
  id: string;
  label: string;
  labelEn?: string;
  mono?: boolean;
  newTab?: boolean;                          // 新开标签页打开（如外部/工具类页面）
  zhOnly?: boolean;                          // 仅中文显示（无英文版页面，避免英文 404）
  meta?: boolean;                            // 元页面：进侧栏但不出现在“上一篇/下一篇”阅读链
}

export interface NavGroup {
  id: string;
  label: string;
  labelEn?: string;
  href?: string;                             // 分组头即链接（点击打开对应 md 主页）
  children: (NavGroup | NavLeaf)[];          // 支持嵌套分组
}

export interface NavSection {
  id: string;
  label: string;
  labelEn?: string;
  accent?: boolean;                 // for humans：橙色左边框强调块
  bordered?: boolean | 'bottom';    // 顶部/底部边框
  indented?: boolean;               // 缩进行（附录 / Tools）
  collapsible?: boolean;            // 可折叠
  bare?: boolean;                   // 纯视觉分组：id 不进入 URL（如 for-humans）
  icon?: string;                    // 图标路径（public/assets/…）
  iconClass?: string;
  shared?: boolean;                 // 语言中立区块（如 Tools）：路由不随 locale 加前缀
  children?: (NavGroup | NavLeaf)[];
}

export const NAV: NavSection[] = [
  {
    id: 'for-humans',
    label: 'for humans',
    accent: true,
    collapsible: true,
    bare: true, // 分组不进 URL：/create-wallet、/use-wallet/... 等直接挂语言根下
    children: [
      {
        id: 'create-wallet',
        label: '创建钱包',
        labelEn: 'Create a Wallet',
        href: '/create-wallet',
        children: [
          { id: 'create-seeds', label: '助记词', labelEn: 'Seed Phrase' },
          { id: 'create-passphrase', label: 'passphrase' },
        ],
      },
      { id: 'backup-wallet', label: '备份钱包', labelEn: 'Back It Up' },
      {
        id: 'use-wallet',
        label: '使用钱包',
        labelEn: 'Use the Wallet',
        href: '/use-wallet',
        children: [
          { id: 'old-phone', label: '旧手机', labelEn: 'Old Phone' },
          { id: 'hww', label: '硬件钱包', labelEn: 'Hardware Wallet' },
        ],
      },
    ],
  },
  {
    id: 'thinkings',
    label: 'thinkings',
    bordered: true,
    collapsible: false,
    children: [
      { id: 'about-hww', label: '关于硬件钱包', labelEn: 'On Hardware Wallets' },
      { id: 'about-passphrase', label: '关于passphrase', labelEn: 'On Passphrases' },
      { id: 'about-this-site', label: '关于本站', labelEn: 'About This Site', zhOnly: true, meta: true },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: '/assets/tools-icon.svg',
    iconClass: 'tools',
    bordered: 'bottom',
    collapsible: false,
    shared: true,
    children: [
      { id: 'roll-seeds', label: 'roll-seeds.html', newTab: true },
      { id: 'bip39-words-list', label: 'bip39-words-list.html', newTab: true },
      { id: 'last-word-calculator', label: 'last-word-calculator.html', newTab: true },
    ],
  },
];

// ---------------------------------------------------------------------------
// locale / 路径 工具
// ---------------------------------------------------------------------------

/**
 * 语言根前缀（英文默认无前缀；中文统一 zh）：
 *   en -> ''    （URL /xxx）
 *   zh -> '/zh' （URL /zh/xxx）
 */
export function routePrefix(locale: Locale): string {
  return locale === 'zh' ? '/zh' : '';
}

/** 内容 id -> 展示路由：去掉纯分组段 for-humans/。 */
export function routeFromId(id: string): string {
  return id.replace(/^for-humans\//, '');
}

/**
 * 从完整路由拆出 locale 与剩余部分：
 *   'create-wallet'        -> { en, 'create-wallet' }
 *   'zh/create-wallet'     -> { zh, 'create-wallet' }
 *   'zh'（中文首页）         -> { zh, '' }
 *   '' / 其它              -> { en, rest }
 */
export function splitLocaleRoute(
  route: string
): { locale: Locale; rest: string } {
  if (route === 'zh') return { locale: 'zh', rest: '' };
  if (route.startsWith('zh/')) return { locale: 'zh', rest: route.slice(3) };
  return { locale: 'en', rest: route };
}

type AnyNavNode = NavSection | NavGroup | NavLeaf;

function labelOf(node: AnyNavNode, locale: Locale): string {
  return locale === 'en' ? (node as NavGroup).labelEn ?? node.label : node.label;
}

const isGroup = (n: NavGroup | NavLeaf): n is NavGroup =>
  'children' in n && !!n.children?.length;

// ---------------------------------------------------------------------------
// 视图树（供 Sidebar 渲染；每个可点节点都带完整 href 与“去掉语言前缀”的 langless）
// ---------------------------------------------------------------------------

export interface NavViewItem {
  id: string;
  label: string;
  href?: string;      // 完整链接（含语言前缀；shared 无前缀）
  langless?: string;  // 去掉语言前缀的路由（用于当前页高亮）
  mono?: boolean;
  newTab?: boolean;
  meta?: boolean;   // 元页面：不出现在“上一篇/下一篇”阅读链
  children?: NavViewItem[];
}

export interface NavViewSection {
  id: string;
  label: string;
  accent?: boolean;
  bordered?: boolean | 'bottom';
  indented?: boolean;
  icon?: string;
  iconClass?: string;
  href?: string;
  langless?: string;
  children?: NavViewItem[];
}

/** 由 NAV 解析出“可直接渲染”的导航树：跳过 bare 段、按 locale 补语言前缀。 */
export function navView(locale: Locale): NavViewSection[] {
  const lp = routePrefix(locale); // '' | '/zh'
  const out: NavViewSection[] = [];

  for (const s of NAV) {
    const shared = !!s.shared;
    const bare = !!s.bare;
    const fullPrefix = shared ? '' : lp; // shared（Tools）不加语言前缀
    const sec: NavViewSection = {
      id: s.id,
      label: labelOf(s, locale),
      accent: s.accent,
      bordered: s.bordered,
      indented: s.indented,
      icon: s.icon,
      iconClass: s.iconClass,
    };

    if (!s.children?.length) {
      const langless = s.id;
      sec.href = fullPrefix + '/' + langless;
      sec.langless = langless;
      out.push(sec);
      continue;
    }

    const items: NavViewItem[] = [];
    const inLocale = (leaf: NavLeaf) => !(leaf.zhOnly && locale !== 'zh');
    const leafView = (leaf: NavLeaf, langless: string): NavViewItem => ({
      id: leaf.id,
      label: labelOf(leaf, locale),
      href: fullPrefix + '/' + langless,
      langless,
      mono: leaf.mono,
      newTab: leaf.newTab,
      meta: leaf.meta,
    });

    for (const child of s.children) {
      if (isGroup(child)) {
        const grp = child as NavGroup;
        const base = grp.href
          ? grp.href.replace(/^\/+/, '')
          : (bare ? '' : `${s.id}/`) + grp.id;
        const node: NavViewItem = { id: grp.id, label: labelOf(grp, locale) };
        if (grp.href) {
          node.href = fullPrefix + grp.href;
          node.langless = base;
        }
        const kids: NavViewItem[] = [];
        for (const gchild of grp.children) {
          if (isGroup(gchild)) {
            // 深层分组（保留扩展性）：其下仍是叶子
            const g2 = gchild as NavGroup;
            const base2 = g2.href ? g2.href.replace(/^\/+/, '') : `${base}/${g2.id}`;
            const sub: NavViewItem = { id: g2.id, label: labelOf(g2, locale) };
            if (g2.href) {
              sub.href = fullPrefix + g2.href;
              sub.langless = base2;
            }
            sub.children = (g2.children as NavLeaf[])
              .filter(inLocale)
              .map((l) => leafView(l, `${base2}/${l.id}`));
            kids.push(sub);
          } else if (inLocale(gchild as NavLeaf)) {
            kids.push(leafView(gchild as NavLeaf, `${base}/${(gchild as NavLeaf).id}`));
          }
        }
        node.children = kids;
        items.push(node);
      } else {
        const leaf = child as NavLeaf;
        if (inLocale(leaf)) items.push(leafView(leaf, bare ? leaf.id : `${s.id}/${leaf.id}`));
      }
    }
    sec.children = items;
    out.push(sec);
  }
  return out;
}

// ---------------------------------------------------------------------------
// 拍平（线性阅读顺序）与查找（按 locale）
// ---------------------------------------------------------------------------

/** 拍平的叶子（含分组主页），顺序即线性阅读顺序 */
export interface FlatEntry {
  route: string; // 完整路由（含语言前缀；不带首斜杠。en 无前缀、zh 以 zh/ 开头）
  label: string;
  mono: boolean;
  sectionId: string;
}

function langlessFull(langless: string, shared: boolean, locale: Locale): string {
  if (shared) return langless;
  return locale === 'zh' ? `zh/${langless}` : langless;
}

const flatCache = new Map<Locale, FlatEntry[]>();

/** 按 locale 拍平的导航（en 无前缀；zh 前缀 zh/；shared 区块两语言同路由） */
export function flatFor(locale: Locale): FlatEntry[] {
  let flat = flatCache.get(locale);
  if (!flat) {
    flat = [];
    const view = navView(locale);
    // navView 丢失 shared 信息，回查 NAV
    const sharedId = new Set(NAV.filter((s) => s.shared).map((s) => s.id));
    const pushLeaf = (
      langless: string,
      label: string,
      mono: boolean,
      sectionId: string
    ) => {
      flat!.push({
        route: langlessFull(langless, sharedId.has(sectionId), locale),
        label,
        mono,
        sectionId,
      });
    };
    for (const sec of view) {
      if (!sec.children?.length) {
        if (sec.langless) pushLeaf(sec.langless, sec.label, false, sec.id);
        continue;
      }
      for (const node of sec.children) {
        if (node.langless && !node.meta) {
          // 分组主页（有 href 的组头）本身是一页
          pushLeaf(node.langless, node.label, false, sec.id);
        }
        for (const leaf of node.children ?? []) {
          if (leaf.langless && !leaf.meta) {
            pushLeaf(leaf.langless, leaf.label, !!leaf.mono, sec.id);
          }
        }
      }
    }
    flatCache.set(locale, flat);
  }
  return flat;
}

/** 去掉可能带上的语言前缀（zh/、历史 en/），得到 langless 路由 */
function toLangless(full: string): string {
  return full.replace(/^(?:zh|en)\//, '');
}

const byRoute = (locale: Locale) =>
  new Map(flatFor(locale).map((e) => [e.route, e]));

export function labelFor(route: string, locale: Locale = 'en'): string | undefined {
  const map = byRoute(locale);
  return (
    map.get(route)?.label ?? map.get(toLangless(route))?.label
  );
}

/** 当前路由所属章节 id（route 可带或去掉语言前缀） */
export function sectionIdOf(route: string, locale: Locale = 'en'): string | undefined {
  const langless = toLangless(route);
  const entry =
    flatFor(locale).find(
      (e) => toLangless(e.route) === langless || e.route === route
    ) ?? flatFor(locale).find((e) => e.route === route);
  return entry?.sectionId;
}

// ---------------------------------------------------------------------------
// 面包屑（按导航树匹配，兼容去掉 for-humans 段的 langless 路由）
// ---------------------------------------------------------------------------

export interface Crumb {
  label: string;
  route?: string; // 完整 href（含语言前缀/首斜杠）
}

/** 解析一个 langless 路由在导航树中的层级，构造面包屑 */
export function sectionsFor(rest: string, locale: Locale): Crumb[] {
  const home: Crumb = {
    label: locale === 'en' ? 'Home' : '首页',
    route: locale === 'en' ? '/' : '/zh',
  };
  const lp = routePrefix(locale); // '' | '/zh'
  const target = rest.replace(/^\//, '').replace(/^(?:zh|en)\//, '');

  const view = navView(locale);
  const sections = NAV.map((s) => ({ raw: s, view: view.find((v) => v.id === s.id)! }));
  const withGroup = (tail: Crumb[]) => [home, ...tail];

  // 该分组本身作为页面（无子导航项，或 thinkings 主文档类兜底由下面处理）
  for (const { raw, view: sec } of sections) {
    if (!sec.children?.length) {
      if (sec.langless === target) {
        return [home, { label: sec.label, route: sec.href }];
      }
      continue;
    }
    // 叶子直接挂在分组下（bare 时无 section 段）
    const directLeaf =
      sec.children.find((n) => !n.children?.length && n.langless === target);
    if (directLeaf) {
      return withGroup([
        { label: sec.label },
        { label: directLeaf.label },
      ]);
    }
    for (const node of sec.children) {
      if (!node.children?.length) continue;
      // 分组主页本身
      if (node.langless === target) {
        return withGroup([
          { label: sec.label },
          { label: node.label },
        ]);
      }
      // 分组下的叶子
      const leaf = node.children.find((l) => l.langless === target);
      if (leaf) {
        const tail: Crumb[] = [{ label: sec.label }];
        tail.push(
          node.href && node.langless
            ? { label: node.label, route: node.href }
            : { label: node.label }
        );
        tail.push({ label: leaf.label });
        return withGroup(tail);
      }
    }
  }

  // 兜底：路径首段是某个非 bare 分组本身（如 thinkings 主文档 /thinkings，未进 NAV）
  const head = target.split('/')[0];
  const headSec = sections.find(({ raw }) => raw.id === head && !raw.bare);
  if (headSec) {
    return [home, { label: headSec.view.label, route: lp + '/' + head }];
  }
  if (target) {
    // 保底：按 labelFor 兜底
    const map = byRoute(locale);
    const entry = map.get(target) ?? map.get(toLangless(target));
    if (entry) return [home, { label: entry.label }];
  }
  return [home];
}

// ---------------------------------------------------------------------------
// 上一篇 / 下一篇（按拍平线性顺序）
// ---------------------------------------------------------------------------

export function prevNext(
  route: string,
  locale: Locale
): { prev?: FlatEntry; next?: FlatEntry } {
  const flat = flatFor(locale);
  // route 可能是带语言前缀的完整路由，也可能去前缀
  const idx = flat.findIndex(
    (e) => e.route === route || toLangless(e.route) === route
  );
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}

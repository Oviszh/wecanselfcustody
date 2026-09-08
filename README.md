# Self Custody — Simple, Safe Bitcoin Self-Custody Guides

**Live site:** <https://selfcustodyforhumans.com>

Plain-language Bitcoin self-custody education for non-technical people (parents, partners, newcomers). Core method: **BIP39 seed phrase + passphrase**, generated from real dice or coin flips. Built with **Astro** as a static site — every article is its own SEO-friendly page, with built-in full-text search and comments.

## Quick start

```bash
npm install
npm run dev     # → http://localhost:4321
```

## Project layout

```
├── astro.config.mjs        # site URL, trailingSlash, Shiki, sitemap
├── src/
│   ├── content.config.ts   # content schema (frontmatter)
│   ├── content/docs/       # ★ articles — Simplified Chinese
│   ├── content/docs-en/    # ★ articles — English
│   ├── data/nav.ts         # sidebar tree — add/remove nav entries here
│   ├── layouts/            # BaseLayout (chrome + SEO) / DocLayout (article)
│   ├── components/         # Sidebar, Topbar, Search, Breadcrumb, Toc, PrevNext, Comments…
│   ├── scripts/            # collapsible, reading-progress, search
│   ├── styles/             # global.css (design tokens) + fonts.css (self-hosted)
│   └── pages/              # index, [...slug] doc routes, zh/, tools/, rss, robots, 404
├── public/                 # assets, fonts, pictures, videos, _headers
└── TEMPLATE.md             # article template
```

## Writing an article

1. A page's route equals its file path — routing is derived in `src/data/nav.ts`.
2. Add `src/content/docs/<route>.md` for Chinese, or the same path under `docs-en/` for English.
3. Every file starts with frontmatter:

   ```markdown
   ---
   title: 创建钱包
   description: one-line SEO summary (recommended)
   date: 2026-08-19       # optional; used by RSS
   draft: false
   ---
   ```

4. A page with an empty body shows a "content coming soon" placeholder.

Media & extras:

- Video: `<video controls src="/videos/xxx.mp4">` (put the file in `public/videos/`).
- Interactive tools live under `/tools/` (e.g. `…/tools/roll-seeds/`).
- Search: built-in Pagefind (Chinese-aware) via the top-bar button.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Build to `dist/` (runs Pagefind index) |
| `npm run preview` | Preview the built site |

## Deploy

Automatic **Cloudflare Pages** build from the GitHub repo (`master`):

- Build command: `npm run build` · Output directory: `dist` · Node ≥ 22
- Custom domain: `selfcustodyforhumans.com`

> The three `/tools/` pages download their fixed-name HTML assets from each tool repository's latest stable GitHub Release at build time. Keep those repositories and Release assets public. Publishing a tool does not change the deployed site until this project is built again.

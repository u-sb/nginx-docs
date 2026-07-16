# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation site for [n.wtf](https://n.wtf/) - an nginx Debian/Ubuntu repository that provides up-to-date nginx mainline builds with OpenSSL, TLS 1.3, HTTP/3, and additional modules (Brotli, Zstd, GeoIP2, ACME).

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Development server
bun run build        # Build (astro build + pagefind indexing into dist/)
bun run check        # Type-check (astro check)
```

Always use **bun** (not npm/pnpm). When adding dependencies, install the latest version via `bun add` — never guess/pin version numbers by hand.

## ⚠️ Important Rules

- **Version numbers are single-sourced.** Nginx/OpenSSL versions live ONLY in `src/lib/website_config.ts` (`versions.nginx`, `versions.openssl`, `versions.opensslDate`). Never hardcode current versions in pages/components — import `versions` instead. Historical versions in `docs/changelog.mdx` and `blog/*.mdx` are records; leave them alone.
- **TypeScript stays on 6.x.** TS 7 (the Go-based rewrite) is not yet supported by Astro (and previously broke twoslash). When running `ncu`/upgrades, skip typescript (`ncu -u --reject typescript`).
- **Never invent or rewrite copy (文案).** All user-facing text was written/approved by the owner. Install commands must be the real ones (extrepo / `mirror-cdn.xtom.com` apt source / DEB822 / `ghcr.io/u-sb/nginx` Docker) — no placeholder domains. When porting or restyling, keep text verbatim.
- **Long code lines vs CSS grid.** Command lines don't wrap (`whitespace-pre`); a grid item defaults to `min-width: auto` and a long line will blow the track past the container and crush sibling columns. Every grid column containing a terminal card needs `min-w-0` (or `minmax(0,1fr)` on the track) and the code container needs `overflow-x-auto`.
- **`public/public.key` and `public/public-rsa.key` are the apt signing keys** served at n.wtf — never delete or rename them. Favicons in `public/` are also live assets.
- **Trailing slashes are mandatory** (`trailingSlash: 'always'`): internal links must be `/blog/${id}/`, `/tags/${slug}/`, etc.
- **SVG icons are never hand-drawn.** Extract paths from the installed `simple-icons` (brand glyphs) or `@tabler/icons` (UI glyphs, `node_modules/@tabler/icons/icons/outline/*.svg`) packages.
- **Changelog date headings use three-letter month abbreviations** (`## Jul 17, 2026`), consistently.
- **Generated files are not tracked:** `public/images/` (OG image cache), `.astro/`, `dist/` are all gitignored. The sitemap comes from @astrojs/sitemap at build time.

## Release Checklist (new nginx/OpenSSL version)

1. Bump `versions` in `src/lib/website_config.ts` (nginx, openssl, opensslDate — the date printed by `nginx -V`).
2. If the `nginx -V` output changed structurally (new modules/flags), update the `configure arguments` block in `src/pages/intro.astro`.
3. Add a changelog entry at the TOP of the array in `src/data/changelog.ts` (date format `Jul 17, 2026`).
4. Optionally add a release post in `blog/` (body = the changelog bullets verbatim, tags like `[nginx, Release]`).
5. `bun run build` to verify, then commit.

## Architecture

**Framework**: Astro 7, fully static (`trailingSlash: 'always'`, output to `dist/`)

**Content**: Markdown is used ONLY for blog posts (`blog/*.mdx`, collection in `src/content.config.ts`; frontmatter: title, excerpt, date, tags, optional updated). All doc pages (intro, install, mirrors, changelog, contact, features) are structured Astro templates in `src/pages/*.astro` wrapping `DocsLayout`. Changelog entries live as data in `src/data/changelog.ts` (items support inline markdown, rendered with marked.parseInline). Per-module pages (`/modules/<slug>/`) render from `src/data/module-details/group-{a..d}.ts` (aggregated + alphabetized in `src/data/module-details/index.ts`); the homepage/features grids derive their cards from the same data via `src/data/modules.ts`, so adding a module = adding one entry to a group file.

**Key Files**:
- `astro.config.ts` - Site config, MDX/rehype pipeline (highlight.js with nginx language, heading anchors, terminal-card code blocks)
- `src/lib/website_config.ts` - Site metadata, navbar, and the `versions` single source of truth
- `src/integrations/og-images.mjs` - Build-time OG image generation via @takumi-rs (fonts read from @fontsource in node_modules), cached in `public/images/`, referenced by BaseHead as `/images/<slug>.webp`
- `src/layouts/BaseLayout.astro` - HTML shell (BaseHead, Header, Footer, SearchModal, code copy buttons)
- `src/layouts/DocsLayout.astro` - Inner-page template: breadcrumb `~ / <slug>`, h1 + lede, sticky right TOC with IntersectionObserver scroll-spy
- `src/pages/` - index (homepage), doc pages (intro/install/mirrors/changelog/contact/features), `blog/` + `tags/` (lists, pagination, post detail with ShareButtons + JSON-LD), 404, feeds (`rss.xml.ts`, `atom.xml.ts` via `src/lib/feed.ts`), `robots.txt.ts`, `llms.txt.ts`
- `src/components/TerminalCard.astro` + `src/lib/highlight-shell.ts` - Shared terminal-style code cards with build-time shell highlighting and a copy button (used by homepage tabs, install, mirrors)
- `src/components/SearchModal.astro` - Pagefind search (Ctrl/Cmd+K or `/`); index only exists after a full build

**Styling**:
- Tailwind CSS v4, CSS-first config in `src/styles/globals.css` (`@theme` block), **dark-only** (no light theme, no theme toggle)
- Design source: Claude Design mockups (Home.dc.html / Intro.dc.html, project 85b9d216-1192-4d13-a8b1-af549d1e19f2). New pages must reuse the same tokens/patterns
- Tokens: canvas `#0b0c0e`, panel `#101114`, cell `#0e0f12`, ink `#f4f5f6`, body `#b6b9c0`, soft `#a1a4ab`, mute `#8b8f97`, faint `#6b6f78`, comment `#5f636b`, accent `#34e39a` (acc) / `#9af0c8` (acc2); borders `rgba(255,255,255,0.06–0.18)`
- Fonts (self-hosted via @fontsource): Space Grotesk (display/headings), IBM Plex Sans (body), JetBrains Mono (code/labels/nav)
- Container: max-w 1120px, px-8; sticky 58px blurred header; radius 6px buttons / 8px cards
- Markdown bodies render inside `<div id="markdown">` to pick up the doc styling; code fences become terminal cards with filename bar + copy button

**Deployment**: GitHub Actions on push to master - builds `dist/`, deploys via SSH rsync to the remote server (`.github/workflows/build.yml`).

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

## Architecture

**Framework**: Astro 7, fully static (`trailingSlash: 'always'`, output to `dist/`)

**Content Collections** (defined in `src/content.config.ts`):
- `docs/*.mdx` - Documentation pages (intro, install, mirrors, changelog, contact, features)
- `blog/*.mdx` - Blog posts (frontmatter: title, excerpt, date, tags, optional updated)

**Key Files**:
- `astro.config.ts` - Site config, MDX/rehype pipeline (highlight.js, heading anchors, terminal-card code blocks)
- `src/lib/website_config.ts` - Site metadata, navbar, and the single source of truth for shipped versions (`versions.nginx`, `versions.openssl`)
- `src/integrations/og-images.mjs` - Build-time OG image generation via @takumi-rs, cached in `public/images/`
- `src/layouts/BaseLayout.astro` - HTML shell (head, header, footer, search modal, copy buttons)
- `src/pages/` - Routes: homepage, docs pages, `blog/` + `tags/` listings, `404.astro`, feeds (`rss.xml.ts`, `atom.xml.ts` via `src/lib/feed.ts`), `robots.txt.ts`
- `src/components/SearchModal.astro` - Pagefind search UI (Ctrl/Cmd+K or `/`); index only exists after a full build

**Styling**:
- Tailwind CSS v4, CSS-first config in `src/styles/globals.css` (`@theme` block), dark-only
- Design tokens: canvas `#0b0c0e`, panel `#101114`, cell `#0e0f12`, ink `#f4f5f6`, accent `#34e39a` (acc) / `#9af0c8` (acc2)
- Fonts: Space Grotesk (display), IBM Plex Sans (body), JetBrains Mono (code/labels)

**Deployment**: GitHub Actions on push to master - builds `dist/`, deploys via SSH rsync to the remote server (`.github/workflows/build.yml`).

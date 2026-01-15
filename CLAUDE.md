# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation site for [n.wtf](https://n.wtf/) - an nginx Debian/Ubuntu repository that provides up-to-date nginx mainline builds with OpenSSL 3.x, TLS 1.3, HTTP/3, and additional modules (Brotli, Zstd, GeoIP2, ACME).

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Development server
bun run build        # Build (runs sitemap generation + next build + pagefind)
bun run sitemap      # Generate sitemap.xml only
```

## Architecture

**Framework**: Nextra v4 with Next.js 16, static export (`output: 'export'`)

**Key Files**:
- `content/*.md` - Documentation pages (intro, install, mirrors, changelog, contact)
- `content/_meta.ts` - Sidebar navigation order and titles
- `src/app/page.tsx` + `page-client.tsx` - Custom homepage with Quick Install tabs
- `src/app/[...mdxPath]/page.tsx` - Catch-all route for MDX content pages
- `mdx-components.tsx` - Custom MDX components (adds copy button and word-wrap to code blocks)
- `src/styles/globals.css` - Global styles including code block theming
- `scripts/generate-sitemap.ts` - Sitemap generator run before build

**Build Pipeline**:
1. `bun run sitemap` generates `public/sitemap.xml`
2. `next build` outputs static files to `out/`
3. `pagefind` indexes the site for search (`out/_pagefind/`)

**Styling**:
- Code blocks use `dracula-soft` Shiki theme with dark background (`#0d1117`)
- Brand color is pink (`#ec4899`)
- Fonts: Space Grotesk (body), Space Mono (code), Inter (fallback)

**Deployment**: GitHub Actions builds on push to master, deploys via SSH to remote server.

import { Renderer } from '@takumi-rs/core';
import { fromJsx } from '@takumi-rs/helpers/jsx';
import { prepareImages } from '@takumi-rs/helpers';
import React from 'react';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import website_config from './_og-config.mjs';

const WIDTH = 1200;
const HEIGHT = 630;
const FORMAT = 'webp';
const QUALITY = 90;
const PUBLIC_IMAGES = 'public/images';
const FONT_BOLD = 'node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2';
const FONT_REGULAR = 'node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2';

const COLOR = { bg: '#0b0c0e', fg: '#f4f5f6', muted: '#a1a4ab', footer: '#6b6f78', accent: '#34e39a' };

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'");
}

function readMeta(html, property) {
  const m = html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`));
  return m ? decodeEntities(m[1]) : '';
}

function truncate(s, n) {
  if (!s) return '';
  return s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s;
}

// Text brand: n<accent>.</accent>wtf
function brandMark(fontSize) {
  return React.createElement(
    'div',
    { style: { display: 'flex', fontSize, fontWeight: 700, color: COLOR.fg } },
    [
      React.createElement('span', { key: 'n' }, 'n'),
      React.createElement('span', { key: 'dot', style: { color: COLOR.accent } }, '.'),
      React.createElement('span', { key: 'wtf' }, 'wtf'),
    ],
  );
}

function ogCard(title, description, footer) {
  const middle = [
    React.createElement(
      'div',
      { key: 'title', style: { display: 'flex', fontSize: 60, fontWeight: 700, lineHeight: 1.15, color: COLOR.fg } },
      title,
    ),
  ];
  if (description) {
    middle.push(
      React.createElement(
        'div',
        { key: 'desc', style: { display: 'flex', fontSize: 28, lineHeight: 1.4, color: COLOR.muted, marginTop: 28 } },
        description,
      ),
    );
  }
  return React.createElement(
    'div',
    {
      style: {
        height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', backgroundColor: COLOR.bg, color: COLOR.fg,
        padding: '70px', fontFamily: 'Space Grotesk',
      },
    },
    [
      React.createElement(
        'div',
        { key: 'top', style: { display: 'flex', flexDirection: 'row', alignItems: 'center' } },
        [brandMark(30)],
      ),
      React.createElement('div', { key: 'mid', style: { display: 'flex', flexDirection: 'column' } }, middle),
      React.createElement('div', { key: 'bottom', style: { display: 'flex', fontSize: 24, color: COLOR.footer } }, footer),
    ],
  );
}

function imageSlug(pathname) {
  return pathname.replace(/^\/+|\/+$/g, '') || 'index';
}

export default function ogImages() {
  return {
    name: 'nwtf-og-images',
    hooks: {
      'astro:build:done': async ({ pages, dir, logger }) => {
        const renderer = new Renderer();
        for (const font of [FONT_BOLD, FONT_REGULAR]) {
          await renderer.registerFont(await readFile(font));
        }
        const distDir = fileURLToPath(dir);
        const host = website_config.website_url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const footer = `[ ${host} ]`;

        let generated = 0;
        let reused = 0;

        for (const page of pages) {
          const slug = imageSlug(page.pathname);
          const htmlFile = [
            path.join(distDir, page.pathname, 'index.html'),
            path.join(distDir, `${slug}.html`),
          ].find((p) => existsSync(p));
          if (!htmlFile) continue;

          const rel = `${slug}.${FORMAT}`;
          const publicFile = path.join(PUBLIC_IMAGES, rel);
          const distFile = path.join(distDir, 'images', rel);
          await mkdir(path.dirname(distFile), { recursive: true });

          if (existsSync(publicFile)) {
            await copyFile(publicFile, distFile);
            reused++;
            continue;
          }

          const html = await readFile(htmlFile, 'utf8');
          const title = readMeta(html, 'og:title') || website_config.website_name;
          const description = truncate(readMeta(html, 'og:description'), 140);

          const { node, stylesheets } = await fromJsx(ogCard(title, description, footer));
          const images = await prepareImages({ node });
          const buffer = Buffer.from(
            await renderer.render(node, { width: WIDTH, height: HEIGHT, format: FORMAT, quality: QUALITY, stylesheets, images }),
          );

          await mkdir(path.dirname(publicFile), { recursive: true });
          await writeFile(publicFile, buffer);
          await writeFile(distFile, buffer);
          generated++;
        }

        logger.info(`OG images: ${generated} generated, ${reused} reused`);
      },
    },
  };
}

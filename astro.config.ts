import {defineConfig} from 'astro/config';
import {unified} from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeHighlight from 'rehype-highlight';
import nginx from 'highlight.js/lib/languages/nginx';
import bash from 'highlight.js/lib/languages/bash';
import shell from 'highlight.js/lib/languages/shell';
import yaml from 'highlight.js/lib/languages/yaml';
import ini from 'highlight.js/lib/languages/ini';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import plaintext from 'highlight.js/lib/languages/plaintext';
import rehypeCustomSlug from './src/lib/rehype-custom-slug';
import rehypeHeadingAnchor from './src/lib/rehype-heading-anchor';
import rehypeCodeBlock from './src/lib/rehype-code-block';
import ogImages from './src/integrations/og-images.mjs';

export default defineConfig({
    site: 'https://n.wtf',
    trailingSlash: 'always',
    integrations: [mdx({optimize: true}), sitemap(), ogImages()],
    build: {
        format: 'directory',
    },
    markdown: {
        syntaxHighlight: false,
        processor: unified({
            gfm: true,
            smartypants: false,
            rehypePlugins: [
                [rehypeHighlight, {languages: {nginx, bash, shell, yaml, ini, json, xml, html: xml, plaintext, text: plaintext}}],
                rehypeCustomSlug,
                rehypeHeadingAnchor,
                rehypeCodeBlock,
            ],
        }),
    },
    vite: {
        plugins: [tailwindcss()],
    },
});

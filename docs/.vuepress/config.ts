import { defineUserConfig } from 'vuepress'
import type { MixThemeConfig } from 'vuepress-theme-mix/lib/node'
import { navbar, sidebar } from './configs'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig<MixThemeConfig>({
  // Site Config
  base: '/',

  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/favicon-16x16.png`,
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/favicon-32x32.png`,
      },
    ],
    ['link', { rel: 'manifest', href: '/site.webmanifestt' }],
    ['meta', { name: 'application-name', content: 'Nginx by U.SB' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Nginx by U.SB' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/apple-touch-icon.png` },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#ff55ff' }],
    ['meta', { name: 'theme-color', content: '#ff55ff' }],
    ['script', {}, `
const script = document.createElement('script');
script.async = true;
script.defer = true;
script['data-domain'] = 'nginx.u.sb';
script.src = 'https://stat.u.sb/js/plausible.js';
document.head.appendChild(script);`
],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Nginx by U.SB', // for broswer tabs
      description: 'A nginx Debian / Ubuntu repository',
    },
  },

  bundler:
    // specify bundler via environment variable
    process.env.DOCS_BUNDLER ??
    // use vite by default
    '@vuepress/vite',

  // Theme Config
  theme: 'vuepress-theme-mix',
  themeConfig: {
    logo: '/apple-touch-icon.png',
    title: 'Nginx by U.SB', // for navbar
    docsRepo: 'u-sb/nginx-docs',
    docsDir: 'docs',
    editLink: true,
    lastUpdated: false,
    mode: 'dark',

    locales: {
      '/': {
        navbar: navbar.en,
        sidebar: sidebar.en,
      },
    },

    themePlugins: {
      git: isProd,
    },
  },

  // Directory Config
  dest: 'public',

  // Plugins Config
  plugins: [
  ],
})

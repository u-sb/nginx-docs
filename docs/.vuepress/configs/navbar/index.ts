import type { NavbarConfig } from 'vuepress-theme-mix'

export const en: NavbarConfig = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'Guide',
    link: '/guide.html',
  },
  {
    text: 'Install',
    children: [
    '/install.html',
      {
        text: 'Docker',
        link: 'https://github.com/u-sb/nginx-docker',
      },
    ],
  },
  {
    text: 'Mirrors',
    link: '/mirrors.html',
  },
  {
    text: 'Changelog',
    link: '/changelog.html',
  },
  {
    text: 'SB Blog',
    link: 'https://u.sb/',
  },
  {
    text: 'GitHub',
    link: 'https://github.com/u-sb/nginx-docs',
  },
]
module.exports = {
    title: 'Nginx.io',
    theme: 'vt',
    themeConfig: {
      repo: "nginx-io/nginx-io-docs",
      docsDir: "docs",
      docsBranch: 'main',
      editLinks: true,
      lastUpdated: 'Last Updated',
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Installation', link: '/install.html' },
        { text: 'Mirrors', link: '/mirrors.html' },
        { text: 'Changelog', link: '/changelog.html' },
        { text: 'Sponsor', link: 'https://xtom.com/' },
      ],
      sidebar: 'auto',
      search: false,
      enableDarkMode: true
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
// add Plausible analytics
['script', {}, `
const script = document.createElement('script');
script.async = true;
script.defer = true;
script['data-domain'] = 'nginx.io';
script.src = 'https://stat.xtom.com/js/plausible.js';
document.head.appendChild(script);`
],
    ],
    markdown: {
      lineNumbers: false
    },
    plugins: [
      ['@vuepress/back-to-top'],
      ['@vuepress/nprogress']
    ]
  }
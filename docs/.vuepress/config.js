module.exports = {
    title: 'Nginx.io',
    theme: 'default-prefers-color-scheme',
    themeConfig: {
      repo: "sb-sb/nginx-io-docs",
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
        { text: 'Github', link: 'https://github.com/sb-sb/nginx-io-docs' },
      ],
      sidebar: 'auto',
      search: false
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }],
// add matomo analytics
    ['script', {}, `
    var _paq = window._paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u="https://stat.loli.net/";
      _paq.push(['setTrackerUrl', u+'matomo.php']);
      _paq.push(['setSiteId', '7']);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
    })();`
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
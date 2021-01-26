module.exports = {
    title: 'Nginx.io',
    theme: 'default-prefers-color-scheme',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Installation', link: '/install.html' },
        { text: 'Mirrors', link: '/mirrors.html' },
        { text: 'Changelog', link: '/changelog.html' },
        { text: 'Sponsor', link: 'https://xtom.com/' },
      ],
      sidebar: 'auto',
      search: false
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    markdown: {
      lineNumbers: false
    },
    plugins: [
      [
        "vuepress-plugin-matomo",
        {
          'siteId': 7,
          'trackerUrl': "https://stat.loli.net/"
        },
      ]
    ]
  }
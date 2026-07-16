const website_config = {
    title: 'N.WTF',
    description: 'Open-source nginx Debian / Ubuntu repository with latest mainline builds.',
    baseUrl: 'https://n.wtf',
    author: {
        name: 'm.ac',
        link: 'https://m.ac/',
    },
    github: 'https://github.com/u-sb/nginx-docs',
    navbar: [
        {title: 'Home', path: '/'},
        {title: 'Introduction', path: '/intro/'},
        {title: 'Install', path: '/install/'},
        {title: 'Mirrors', path: '/mirrors/'},
        {title: 'Changelog', path: '/changelog/'},
        {title: 'Blog', path: '/blog/'},
        {title: 'Contact', path: '/contact/'},
    ],
    perPage: 10,
};

// Single source of truth for shipped versions — imported across pages / components.
export const versions = {
    nginx: '1.31.3',
    openssl: '4.0.1',
};

export default website_config;

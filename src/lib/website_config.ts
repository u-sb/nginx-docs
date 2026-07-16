const website_config = {
    title: 'N.WTF',
    description: 'Open-source nginx Debian / Ubuntu repository with latest mainline builds.',
    baseUrl: 'https://n.wtf',
    author: {
        name: 'm.ac',
        link: 'https://m.ac/',
    },
    // Source repo for the nginx packaging; this website lives at u-sb/nginx-docs.
    github: 'https://github.com/u-sb/nginx-source',
    navbar: [
        {title: 'Home', path: '/'},
        {title: 'Introduction', path: '/intro/'},
        {title: 'Install', path: '/install/'},
        {title: 'Features', path: '/features/'},
        {title: 'Mirrors', path: '/mirrors/'},
        {title: 'Changelog', path: '/changelog/'},
        {title: 'Blog', path: '/blog/'},
        {title: 'Contact', path: '/contact/'},
    ],
    perPage: 10,
};

// Single source of truth for shipped versions — imported across pages / components.
// Bump these (and only these) on every release; the OpenSSL date is the one
// printed by `nginx -V` ("built with OpenSSL <version> <date>").
export const versions = {
    nginx: '1.31.3',
    openssl: '4.0.1',
    opensslDate: '9 Jun 2026',
};

export default website_config;

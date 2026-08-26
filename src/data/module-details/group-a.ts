import type {ModuleDetail} from './types';

export const groupA: ModuleDetail[] = [
    {
        slug: 'brotli',
        name: 'ngx_brotli',
        desc: 'Brotli compression for responses and static assets',
        kind: 'dynamic',
        package: 'libnginx-mod-http-brotli',
        metapackage: 'nginx',
        repo: 'https://github.com/google/ngx_brotli',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_brotli adds Brotli compression to nginx. Brotli is a compression format developed at Google that typically produces smaller output than gzip at comparable speed, and every modern browser advertises support for it in the Accept-Encoding header.',
            'The project ships two modules. The filter module compresses responses on the fly, and the static module serves pre-compressed .br files from disk so no CPU is spent at request time.',
            'Google maintains the module. It is one of the most widely deployed third-party nginx modules and is compiled into most distribution builds. Our package installs a ready-made /etc/nginx/snippets/brotli.conf; include it from nginx.conf to switch it on.',
        ],
        highlights: [
            {
                name: 'brotli',
                desc: 'Enables on-the-fly Brotli compression of responses; off by default.',
            },
            {
                name: 'brotli_comp_level',
                desc: 'Sets the compression quality from 0 to 11, default 6.',
            },
            {
                name: 'brotli_types',
                desc: 'Limits compression to the listed MIME types, default text/html.',
            },
            {
                name: 'brotli_min_length',
                desc: 'Skips responses shorter than the given byte length, default 20.',
            },
            {
                name: 'brotli_static',
                desc: 'Serves a pre-compressed .br file next to the original when the client accepts Brotli.',
            },
            {
                name: 'brotli_window',
                desc: 'Sets the sliding window size used during compression, default 512k.',
            },
        ],
        example: `# the package installs /etc/nginx/snippets/brotli.conf:
#     brotli on;
#     brotli_static on;
#     brotli_comp_level 5;
#     brotli_types application/javascript application/json ... text/css;

# turn it on from the http block of nginx.conf
include /etc/nginx/snippets/brotli.conf;

# anything after the include overrides the shipped defaults
brotli_comp_level 6;
brotli_min_length 256;`,
    },
    {
        slug: 'zstd',
        name: 'zstd-nginx-module',
        desc: 'Zstandard response compression with dictionary support',
        kind: 'dynamic',
        package: 'libnginx-mod-http-zstd',
        metapackage: 'nginx',
        repo: 'https://github.com/u-sb/zstd-nginx-module',
        license: 'BSD-2-Clause',
        overview: [
            'zstd-nginx-module adds Zstandard (zstd) compression to nginx. Zstandard is a compression algorithm developed at Facebook that targets high compression ratios at fast compression and decompression speeds.',
            'Like ngx_brotli, it builds two loadable modules: ngx_http_zstd_filter_module compresses responses on the fly, and ngx_http_zstd_static_module serves pre-compressed .zst files from disk. It can also load an external dictionary trained on your content, which improves ratios on small responses. Our package installs a ready-made /etc/nginx/snippets/zstd.conf; include it from nginx.conf to switch it on.',
            'The module was written by Alex Zhang (tokers). We build the u-sb fork, which merges the extra directives, memory safety work and test suites from myguard-labs/nginx-zstd-module and GetPageSpeed/zstd-nginx-module. Compression is configured per location, so it is easy to roll out gradually. Keep gzip_vary on, so proxies and CDNs cache the compressed and identity variants apart.',
        ],
        highlights: [
            {
                name: 'zstd',
                desc: 'Enables on-the-fly zstd compression of responses; off by default.',
            },
            {
                name: 'zstd_comp_level',
                desc: 'Sets the compression level, default 3; negative levels trade ratio for CPU.',
            },
            {
                name: 'zstd_min_length',
                desc: 'Skips responses shorter than the given byte length, default 1024.',
            },
            {
                name: 'zstd_types',
                desc: 'Limits compression to the listed MIME types; the built-in default already covers HTML, text, CSS, JavaScript, JSON, XML and SVG.',
            },
            {
                name: 'zstd_static',
                desc: 'Serves a pre-compressed .zst file next to the original when the client accepts zstd.',
            },
            {
                name: 'zstd_long',
                desc: 'Enables long-distance matching for large, repetitive responses; off by default.',
            },
            {
                name: 'zstd_dict_file',
                desc: 'Loads an external zstd dictionary used for both dynamic compression and decompression.',
            },
        ],
        example: `# the package installs /etc/nginx/snippets/zstd.conf:
#     zstd on;
#     zstd_static on;

# turn it on from the http block of nginx.conf
include /etc/nginx/snippets/zstd.conf;

# keep proxies and CDNs caching the compressed and identity variants apart
gzip_vary on;

# anything after the include overrides the shipped defaults
zstd_comp_level 6;`,
    },
    {
        slug: 'acme',
        name: 'nginx-acme',
        desc: 'Automatic TLS certificates via the ACME protocol',
        kind: 'dynamic',
        package: 'libnginx-mod-http-acme',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/nginx/nginx-acme',
        docs: 'https://nginx.org/en/docs/http/ngx_http_acme_module.html',
        license: 'Apache-2.0',
        overview: [
            'nginx-acme implements the ACMEv2 protocol (RFC 8555) inside nginx itself. It obtains and renews TLS certificates automatically, so external clients such as certbot and their reload hooks are no longer needed.',
            'Certificates can come from any ACMEv2 authority, including Let\'s Encrypt. The module answers http-01 or tls-alpn-01 challenges on its own, keeps certificates and keys in a shared memory zone, and can persist state on disk across restarts.',
            'The module is developed by the nginx team at F5, is written in Rust, and is documented on nginx.org alongside the core modules.',
        ],
        highlights: [
            {
                name: 'acme_issuer',
                desc: 'Defines an ACME certificate authority with its directory URI, account key, contact, and challenge settings.',
            },
            {
                name: 'acme_certificate',
                desc: 'Requests and renews a certificate for the server\'s names from the given issuer.',
            },
            {
                name: 'acme_shared_zone',
                desc: 'Allocates shared memory for certificates, keys, and challenge data, 256k by default.',
            },
            {
                name: '$acme_certificate / $acme_certificate_key',
                desc: 'Variables that feed the managed certificate and key into ssl_certificate and ssl_certificate_key.',
            },
            {
                name: 'challenge',
                desc: 'Selects the ACME challenge type, http-01 (default) or tls-alpn-01.',
            },
            {
                name: 'state_path',
                desc: 'Stores account and certificate data on disk so it survives restarts.',
            },
        ],
        example: `resolver 1.1.1.1;

acme_issuer letsencrypt {
    uri https://acme-v02.api.letsencrypt.org/directory;
    contact mailto:admin@example.com;
    state_path /var/cache/nginx/acme-letsencrypt;
    accept_terms_of_service;
}

acme_shared_zone zone=acme_shared:1M;

server {
    listen 443 ssl;
    server_name example.com;

    acme_certificate letsencrypt;
    ssl_certificate $acme_certificate;
    ssl_certificate_key $acme_certificate_key;
}`,
    },
    {
        slug: 'auth-pam',
        name: 'auth-pam',
        desc: 'Basic authentication against the system PAM stack',
        kind: 'dynamic',
        package: 'libnginx-mod-http-auth-pam',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/sto/ngx_http_auth_pam_module',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_auth_pam_module implements HTTP basic authentication against PAM, the pluggable authentication framework used on Linux. Any PAM backend works, including local Unix accounts, LDAP, and custom pam_exec scripts.',
            'nginx prompts the client for credentials and hands them to the configured PAM service for verification. The worker runs as an unprivileged user, so the PAM stack must authenticate without root: for local shadow passwords that means giving the nginx user read access to /etc/shadow.',
            'The module is maintained by Sergio Talens-Oliag and has been packaged in Debian and Ubuntu for years.',
        ],
        highlights: [
            {
                name: 'auth_pam',
                desc: 'Sets the basic auth realm and turns on PAM authentication for a location, or disables it with off.',
            },
            {
                name: 'auth_pam_service_name',
                desc: 'Selects the PAM service file under /etc/pam.d to authenticate against, default nginx.',
            },
            {
                name: 'auth_pam_set_pam_env',
                desc: 'Exports HOST and REQUEST as PAM environment variables so pam_exec scripts can decide per request.',
            },
            {
                name: 'Backend agnostic',
                desc: 'Works with any PAM module, so the same nginx config can sit in front of Unix accounts, LDAP, or one-time passwords.',
            },
        ],
        example: `load_module modules/ngx_http_auth_pam_module.so;

http {
    server {
        location /admin/ {
            auth_pam "Restricted";
            auth_pam_service_name "nginx";
        }
    }
}`,
    },
    {
        slug: 'cache-purge',
        name: 'cache-purge',
        desc: 'Purge entries from proxy and FastCGI caches',
        kind: 'dynamic',
        package: 'libnginx-mod-http-cache-purge',
        metapackage: 'nginx-full',
        repo: 'https://github.com/FRiCKLE/ngx_cache_purge',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_cache_purge adds cache purging to nginx. It deletes entries from the caches populated by the proxy, FastCGI, uWSGI, and SCGI modules, a capability the open source nginx core does not include.',
            'A purge is triggered by an HTTP request whose computed cache key matches the entry to remove, usually via a dedicated location restricted to trusted addresses. Applications can then invalidate a stale page immediately instead of waiting for the cache entry to expire.',
            'The module was written by Piotr Sikora at FRiCKLE and upstream marks it production ready. It is a common companion to WordPress and other CMS caching plugins.',
        ],
        highlights: [
            {
                name: 'proxy_cache_purge',
                desc: 'Removes an entry from a proxy_cache zone whose key matches the given value.',
            },
            {
                name: 'fastcgi_cache_purge',
                desc: 'Removes an entry from a fastcgi_cache zone, the usual choice for PHP-FPM setups.',
            },
            {
                name: 'uwsgi_cache_purge / scgi_cache_purge',
                desc: 'The same purge support for caches filled by the uwsgi and scgi modules.',
            },
            {
                name: 'Access control',
                desc: 'Purge endpoints are ordinary nginx locations, so allow and deny rules decide who may purge.',
            },
        ],
        example: `load_module modules/ngx_http_cache_purge_module.so;

http {
    proxy_cache_path /var/cache/nginx/app keys_zone=app_cache:10m;

    server {
        location / {
            proxy_pass http://127.0.0.1:8080;
            proxy_cache app_cache;
            proxy_cache_key $uri$is_args$args;
        }

        location ~ /purge(/.*) {
            allow 127.0.0.1;
            deny all;
            proxy_cache_purge app_cache $1$is_args$args;
        }
    }
}`,
    },
];

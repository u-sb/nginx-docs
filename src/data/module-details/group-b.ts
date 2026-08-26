import type {ModuleDetail} from './types';

export const groupB: ModuleDetail[] = [
    {
        slug: 'dav-ext',
        name: 'dav-ext',
        desc: 'Adds the missing WebDAV methods to nginx',
        kind: 'dynamic',
        package: 'libnginx-mod-http-dav-ext',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/arut/nginx-dav-ext-module',
        license: 'BSD-2-Clause',
        overview: [
            'nginx-dav-ext-module adds the WebDAV methods PROPFIND, OPTIONS, LOCK, and UNLOCK to nginx. The stock ngx_http_dav_module only implements PUT, DELETE, MKCOL, COPY, and MOVE, which is not enough for most WebDAV clients.',
            'With both modules enabled, nginx can serve a full WebDAV share that works with clients such as macOS Finder, Windows Explorer, and cadaver. Locking state is kept in a shared memory zone, so it works across worker processes.',
            'The module is written by Roman Arutyunyan, an nginx core developer. It requires libxml2 for parsing PROPFIND request bodies.',
        ],
        highlights: [
            {
                name: 'dav_ext_methods',
                desc: 'Enables PROPFIND, OPTIONS, LOCK, and UNLOCK for a location, complementing the dav_methods directive of the stock DAV module.',
            },
            {
                name: 'dav_ext_lock_zone',
                desc: 'Declares a shared memory zone that stores WebDAV locks, with a configurable size and lock timeout.',
            },
            {
                name: 'dav_ext_lock',
                desc: 'Activates locking in a location by pointing it at a named lock zone.',
            },
            {
                name: 'PROPFIND support',
                desc: 'Answers property queries about files and collections, which is the request most WebDAV clients send first.',
            },
        ],
        example: `load_module modules/ngx_http_dav_ext_module.so;

http {
    dav_ext_lock_zone zone=davlock:10m;

    server {
        location /webdav/ {
            root /srv/dav;
            dav_methods PUT DELETE MKCOL COPY MOVE;
            dav_ext_methods PROPFIND OPTIONS LOCK UNLOCK;
            dav_ext_lock zone=davlock;
        }
    }
}`,
    },
    {
        slug: 'echo',
        name: 'echo',
        desc: 'Shell-style echo, sleep, and subrequests in config',
        kind: 'dynamic',
        package: 'libnginx-mod-http-echo',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/openresty/echo-nginx-module',
        license: 'BSD-2-Clause',
        overview: [
            'echo-nginx-module brings shell-style directives such as echo, sleep, and time into the nginx config. It generates response bodies directly from configuration, with full nginx variable interpolation.',
            'Operators use it to build health-check and debug endpoints, mock upstream responses, test rewrite and variable behavior, and stitch together subrequests without writing an application. All blocking-looking directives, such as echo_sleep, are implemented in a non-blocking way.',
            'The module is written and maintained by Yichun Zhang (agentzh) of OpenResty Inc. and is one of the earliest OpenResty components.',
        ],
        highlights: [
            {
                name: 'echo',
                desc: 'Writes text plus a trailing newline into the response body, interpolating nginx variables such as $remote_addr.',
            },
            {
                name: 'echo_sleep',
                desc: 'Pauses the current request for a given number of seconds without blocking the worker process.',
            },
            {
                name: 'echo_location / echo_location_async',
                desc: 'Issues subrequests to other locations and includes their output, serially or in parallel.',
            },
            {
                name: 'echo_before_body / echo_after_body',
                desc: 'Prepends or appends text around the output of the location\'s regular content handler.',
            },
            {
                name: 'echo_read_request_body',
                desc: 'Reads the client request body so it can be inspected through the $request_body variable.',
            },
        ],
        example: `load_module modules/ngx_http_echo_module.so;

server {
    listen 80;

    location /healthz {
        echo "ok $remote_addr $time_iso8601";
    }

    location /both {
        echo_location_async /a;
        echo_location_async /b;
    }
}`,
    },
    {
        slug: 'fancyindex',
        name: 'fancyindex',
        desc: 'Styled directory listings with headers and sorting',
        kind: 'dynamic',
        package: 'libnginx-mod-http-fancyindex',
        metapackage: 'nginx-full',
        repo: 'https://github.com/aperezdc/ngx-fancyindex',
        license: 'BSD-2-Clause',
        overview: [
            'ngx-fancyindex generates directory listings like the built-in autoindex module, but with control over their appearance. Listings can carry custom HTML headers and footers, external stylesheets, and configurable sorting.',
            'It is the usual choice for public download mirrors and file dumps where the plain autoindex output looks too bare. Ready-made themes exist that only need a fancyindex_css_href or header include.',
            'The module is written and maintained by Adrian Perez de Castro and started as a restyled fork of the stock autoindex code.',
        ],
        highlights: [
            {
                name: 'fancyindex',
                desc: 'Turns fancy directory listings on or off for a location, replacing the autoindex output.',
            },
            {
                name: 'fancyindex_exact_size',
                desc: 'Chooses between exact byte counts and human-readable rounded sizes (KB, MB, GB) in the listing.',
            },
            {
                name: 'fancyindex_header / fancyindex_footer',
                desc: 'Inserts a local file or subrequest result before and after the generated listing, which is how themes hook in.',
            },
            {
                name: 'fancyindex_default_sort',
                desc: 'Sets the initial sort order, for example name, size, date, or their descending variants.',
            },
            {
                name: 'fancyindex_localtime',
                desc: 'Shows file modification times in the server\'s local time zone instead of GMT.',
            },
            {
                name: 'fancyindex_show_dotfiles',
                desc: 'Controls whether files starting with a dot appear in the listing.',
            },
        ],
        example: `load_module modules/ngx_http_fancyindex_module.so;

server {
    listen 80;

    location /files/ {
        root /srv/www;
        fancyindex on;
        fancyindex_exact_size off;
        fancyindex_localtime on;
        fancyindex_default_sort date_desc;
        fancyindex_header /fancyindex/header.html;
    }
}`,
    },
    {
        slug: 'geoip2',
        name: 'http-geoip2',
        desc: 'Client geolocation from MaxMind GeoIP2 databases',
        kind: 'dynamic',
        package: 'libnginx-mod-http-geoip2',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/leev/ngx_http_geoip2_module',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_geoip2_module exposes geolocation data from MaxMind GeoIP2 and GeoLite2 mmdb databases as nginx variables. It looks up the client IP, or any IP held in a variable, and supports both IPv4 and IPv6.',
            'It replaces the legacy geoip module, which reads the discontinued GeoIP legacy database format. Typical uses are country blocking, region-based routing, and passing location headers to upstream applications.',
            'The module reads databases through libmaxminddb and can reload them on a timer when MaxMind publishes updates. A companion stream module provides the same variables for TCP and UDP proxying.',
        ],
        highlights: [
            {
                name: 'geoip2',
                desc: 'Opens an mmdb database file and starts a block that maps its fields to nginx variables.',
            },
            {
                name: 'Variable mapping',
                desc: 'Each line like $geoip2_country_code country iso_code defines a variable from a lookup path in the database.',
            },
            {
                name: 'auto_reload',
                desc: 'Rechecks the database file at a set interval and reloads it when it changes, so updates need no nginx restart.',
            },
            {
                name: 'source= and default=',
                desc: 'Looks up an alternative IP variable, such as one parsed from X-Forwarded-For, and sets a fallback value when the lookup fails.',
            },
            {
                name: 'Stream support',
                desc: 'A matching ngx_stream_geoip2_module provides the same lookups inside stream {} blocks.',
            },
        ],
        example: `load_module modules/ngx_http_geoip2_module.so;

http {
    geoip2 /var/lib/GeoIP/GeoLite2-Country.mmdb {
        auto_reload 60m;
        $geoip2_country_code country iso_code;
        $geoip2_country_name country names en;
    }

    server {
        location / {
            add_header X-Country $geoip2_country_code;
            proxy_set_header X-Country-Name $geoip2_country_name;
            proxy_pass http://backend;
        }
    }
}`,
    },
    {
        slug: 'headers-more',
        name: 'headers-more',
        desc: 'Set and clear arbitrary request and response headers',
        kind: 'dynamic',
        package: 'libnginx-mod-http-headers-more-filter',
        metapackage: 'nginx-full',
        repo: 'https://github.com/openresty/headers-more-nginx-module',
        license: 'BSD-2-Clause',
        overview: [
            'headers-more-nginx-module sets, replaces, and clears arbitrary request and response headers. Unlike the stock add_header directive, it can rewrite built-in headers such as Server and Content-Type, and it applies to every status code by default, including 4xx and 5xx errors.',
            'Operators use it to hide the Server banner, strip internal headers before responses leave the proxy, and inject or scrub request headers before they reach an upstream. Header rules can be filtered by status code and content type, and cleared by wildcard pattern.',
            'The module is written and maintained by Yichun Zhang (agentzh) of OpenResty Inc. and ships with OpenResty by default.',
        ],
        highlights: [
            {
                name: 'more_set_headers',
                desc: 'Sets or replaces output headers, with -s to match specific status codes and -t to match content types.',
            },
            {
                name: 'more_clear_headers',
                desc: 'Removes output headers entirely, including built-ins like Server, and accepts wildcards such as X-Internal-*.',
            },
            {
                name: 'more_set_input_headers',
                desc: 'Sets or replaces request headers before they reach upstreams and later processing phases.',
            },
            {
                name: 'more_clear_input_headers',
                desc: 'Removes request headers, for example stripping a client-supplied X-Forwarded-For.',
            },
            {
                name: 'Works on error responses',
                desc: 'Header rules apply to 4xx and 5xx responses by default, where add_header needs the always flag.',
            },
        ],
        example: `load_module modules/ngx_http_headers_more_filter_module.so;

server {
    listen 80;

    more_clear_headers 'Server' 'X-Powered-By';
    more_set_headers 'X-Frame-Options: DENY';

    location /api/ {
        more_set_headers -s '404 500' -t 'text/html' 'X-Error-Page: static';
        more_set_input_headers 'X-Request-Source: edge';
        proxy_pass http://backend;
    }
}`,
    },
];

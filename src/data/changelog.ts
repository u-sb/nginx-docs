// Changelog data - newest first. Add new releases to the TOP of this array.
// Items support inline markdown (links, backtick code), rendered with marked.parseInline.
export interface ChangelogEntry {
    date: string;
    items: string[];
}

export const changelog: ChangelogEntry[] = [
    {
        date: "Sep 3, 2026",
        items: [
            "Upgrade nginx to 1.31.5"
        ]
    },
    {
        date: "Aug 26, 2026",
        items: [
            "Upgrade nginx to 1.31.4",
            "Upgrade OpenSSL to 4.0.2",
            "All third-party modules are now built dynamically; Brotli and Zstandard ship in `libnginx-mod-http-brotli` and `libnginx-mod-http-zstd`",
            "Brotli and Zstandard settings moved to `/etc/nginx/snippets/`; `include` them from `nginx.conf` to enable them",
            "Obsolete `conf.d` symlinks are removed on upgrade",
            "`gzip_vary` is enabled by default",
            "Switch the Zstandard module to the [u-sb fork](https://github.com/u-sb/zstd-nginx-module)",
            "Add Ubuntu 26.10 Stonking builds"
        ]
    },
    {
        date: "Jul 17, 2026",
        items: [
            "Upgrade nginx to 1.31.3",
            "Upgrade nginx-acme to 0.4.1"
        ]
    },
    {
        date: "Jun 20, 2026",
        items: [
            "Upgrade nginx to 1.31.2",
            "Upgrade OpenSSL to 4.0.1"
        ]
    },
    {
        date: "May 24, 2026",
        items: [
            "Upgrade nginx to 1.31.1"
        ]
    },
    {
        date: "May 17, 2026",
        items: [
            "Upgrade nginx to 1.31.0"
        ]
    },
    {
        date: "Apr 15, 2026",
        items: [
            "Upgrade nginx to 1.29.7 & 1.29.8"
        ]
    },
    {
        date: "Mar 20, 2026",
        items: [
            "Upgrade nginx to 1.29.6"
        ]
    },
    {
        date: "Mar 1, 2026",
        items: [
            "Upgrade nginx to 1.29.5",
            "Upgrade OpenSSL to 3.6.1"
        ]
    },
    {
        date: "Jan 16, 2026",
        items: [
            "Upgrade nginx to 1.29.4",
            "Debian 13 Trixie onwards are compiled with PCRE2 and a later version of `http_lua` module."
        ]
    },
    {
        date: "Nov 29, 2025",
        items: [
            "Upgrade nginx to 1.29.3",
            "Upgrade OpenSSL to 3.6.0",
            "Add [nginx-acme](https://github.com/nginx/nginx-acme)"
        ]
    },
    {
        date: "Aug 17, 2025",
        items: [
            "Upgrade nginx to 1.29.1",
            "Upgrade OpenSSL to 3.5.2",
            "Add Debian 14 Forky"
        ]
    },
    {
        date: "Jul 10, 2025",
        items: [
            "Upgrade nginx to 1.29.0",
            "Upgrade OpenSSL to 3.5.1",
            "Add Ubuntu 25.10 Questing",
            "Announce end of update for Focal",
            "Add zstd-nginx-module"
        ]
    },
    {
        date: "Apr 19, 2025",
        items: [
            "Upgrade nginx to 1.27.5",
            "Upgrade OpenSSL to 3.5.0",
            "Announce end of update for Buster and Bionic",
            "Add Ubuntu 25.04 Plucky"
        ]
    },
    {
        date: "Feb 17, 2025",
        items: [
            "Upgrade nginx to 1.27.4",
            "Upgrade OpenSSL to 3.4.1"
        ]
    },
    {
        date: "Jan 1, 2025",
        items: [
            "Upgrade nginx to 1.27.3"
        ]
    },
    {
        date: "Nov 03, 2024",
        items: [
            "Upgrade nginx to 1.27.2",
            "Upgrade OpenSSL to 3.4.0"
        ]
    },
    {
        date: "Sep 07, 2024",
        items: [
            "Upgrade OpenSSL to 3.3.2",
            "Add Ubuntu 24.10 Oracular"
        ]
    },
    {
        date: "Sep 02, 2024",
        items: [
            "Upgrade nginx to 1.27.1",
            "Update `ngx_http_subs_filter_module` to support PCRE2",
            "Update `ngx_http_geoip2_module` to support the new nginx API",
            "Update `ngx_http_ipdb_module` to support the new nginx API",
            "Update `ngx_http_lua_module` on Trixie to support PCRE2 - experimental",
            "Announce end of update for Lunar and Mantic"
        ]
    },
    {
        date: "Jun 13, 2024",
        items: [
            "Upgrade nginx to 1.27.0 and OpenSSL to 3.3.1"
        ]
    },
    {
        date: "Mar 16, 2024",
        items: [
            "Upgrade nginx to 1.25.4 and OpenSSL to 3.2.1"
        ]
    },
    {
        date: "Dec 10, 2023",
        items: [
            "Upgrade nginx to 1.25.3 and OpenSSL to 3.2.0"
        ]
    },
    {
        date: "Aug 18, 2023",
        items: [
            "Upgrade nginx to 1.25.2"
        ]
    },
    {
        date: "Aug 4, 2023",
        items: [
            "Upgrade OpenSSL to 3.1.2"
        ]
    },
    {
        date: "Jul 31, 2023",
        items: [
            "Upgrade nginx to 1.25.1",
            "Feature: the `http2` directive, which enables HTTP/2 on a per-server basis; the `http2` parameter of the `listen` directive is now deprecated. If you previously used `listen ... http2`, you should now use `http2 on` instead, or you will see the following warning during configuration testing: `nginx: [warn] the \"listen ... http2\" directive is deprecated, use the \"http2\" directive instead`."
        ]
    },
    {
        date: "Jun 5, 2023",
        items: [
            "Upgrade nginx to 1.25.0",
            "HTTP/3: removed `http3` parameter of `listen` directive, use `quic` instead.",
            "The `ngx_http_quic_module` is merged to `ngx_http_v3_module`."
        ]
    },
    {
        date: "May 1, 2023",
        items: [
            "Upgrade nginx to 1.23.4",
            "Add nginx QUIC"
        ]
    },
    {
        date: "Dec 19, 2022",
        items: [
            "Upgrade nginx to 1.23.3"
        ]
    },
    {
        date: "Oct 19, 2022",
        items: [
            "Upgrade nginx to 1.23.2",
            "Upgrade OpenSSL to 3.0.7",
            "Added Ubuntu 22.10 Kinetic",
            "Removed Debian 9 Stretch"
        ]
    },
    {
        date: "Aug 19, 2022",
        items: [
            "Upgrade nginx to 1.23.1",
            "Upgrade OpenSSL to 1.1.1q / 3.0.5",
            "Announce end of update for Jessie, Xenial, Hirsute and Impish"
        ]
    },
    {
        date: "Jul 3, 2022",
        items: [
            "Upgrade nginx to 1.23.0",
            "Upgrade OpenSSL to 3.0.4",
            "Removed cdnweb mirror in India",
            "Add xTom mirror in Australia"
        ]
    },
    {
        date: "May 27, 2022",
        items: [
            "Domain `nginx.io` was [disputed](https://www.wipo.int/amc/en/domains/search/case.jsp?case_id=57148) and [transferred](https://u.sb/nginx-io/) to F5, who acquired nginx in 2019. We [forked](https://github.com/u-sb/nginx-source) the project `nginx` and are now maintaining it under name `n.wtf`."
        ]
    },
    {
        date: "Mar 14, 2022",
        items: [
            "Change domain and project name to `n.wtf`"
        ]
    },
    {
        date: "Feb 27, 2022",
        items: [
            "Change domain and project name to `nginx.u.sb` and `nginx by u.sb`",
            "Add cdnweb mirror in India"
        ]
    },
    {
        date: "Feb 16, 2022",
        items: [
            "Upgrade nginx to 1.21.6"
        ]
    },
    {
        date: "Jan 21, 2022",
        items: [
            "Add TUNA, BFSU, NJU mirrors in China Mainland"
        ]
    },
    {
        date: "Jan 17, 2022",
        items: [
            "Upgrade nginx to 1.21.5",
            "Upgrade OpenSSL to 3.0.1"
        ]
    },
    {
        date: "Nov 9, 2021",
        items: [
            "Upgrade nginx to 1.21.4"
        ]
    },
    {
        date: "Sep 15, 2021",
        items: [
            "Upgrade nginx to 1.21.3",
            "Upgrade OpenSSL to 3.0.0"
        ]
    },
    {
        date: "Aug 31, 2021",
        items: [
            "Upgrade nginx to 1.21.2",
            "Upgrade OpenSSL to 1.1.1l"
        ]
    },
    {
        date: "Jul 17, 2021",
        items: [
            "Upgrade nginx to 1.21.1"
        ]
    },
    {
        date: "May 27, 2021",
        items: [
            "Upgrade nginx to 1.21.0",
            "Add mirrors in Germany and Estonia"
        ]
    },
    {
        date: "Apr 20, 2021",
        items: [
            "Upgrade nginx to 1.19.10"
        ]
    },
    {
        date: "Mar 31, 2021",
        items: [
            "Upgrade nginx to 1.19.9"
        ]
    },
    {
        date: "Mar 25, 2021",
        items: [
            "Upgrade OpenSSL to 1.1.1k"
        ]
    },
    {
        date: "Mar 20, 2021",
        items: [
            "Upgrade nginx to 1.19.8"
        ]
    },
    {
        date: "Mar 1, 2021",
        items: [
            "Upgrade nginx to 1.19.7",
            "Upgrade OpenSSL to 1.1.1j"
        ]
    },
    {
        date: "Dec 25, 2020",
        items: [
            "Upgrade nginx to 1.19.6"
        ]
    },
    {
        date: "Dec 10, 2020",
        items: [
            "Upgrade OpenSSL to 1.1.1i"
        ]
    },
    {
        date: "Dec 1, 2020",
        items: [
            "Upgrade nginx to 1.19.5"
        ]
    },
    {
        date: "Nov 15, 2020",
        items: [
            "Upgrade nginx to 1.19.4"
        ]
    },
    {
        date: "Oct 18, 2020",
        items: [
            "Upgrade nginx to 1.19.3",
            "Upgrade OpenSSL to 1.1.1h"
        ]
    },
    {
        date: "Sep 1, 2020",
        items: [
            "Upgrade nginx to 1.19.2"
        ]
    },
    {
        date: "Jun 30, 2020",
        items: [
            "Upgrade nginx to 1.19.1"
        ]
    },
    {
        date: "Jun 1, 2020",
        items: [
            "Upgrade nginx to 1.19.0"
        ]
    },
    {
        date: "Apr 23, 2020",
        items: [
            "Upgrade nginx to 1.17.10",
            "Upgrade OpenSSL to 1.1.1g"
        ]
    },
    {
        date: "Mar 8, 2020",
        items: [
            "Upgrade nginx to 1.17.9"
        ]
    },
    {
        date: "Feb 1, 2020",
        items: [
            "Upgrade nginx to 1.17.8",
            "Add `ngx_http_ipdb_module`",
            "Upgrade `ngx_http_geoip2_module`"
        ]
    }
];

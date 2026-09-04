import type {ModuleDetail} from './types';

// Official nginx modules compiled into the binary via --with-http_*_module (part 2).
export const groupF: ModuleDetail[] = [
    {
        slug: 'addition',
        name: 'ngx_http_addition_module',
        desc: 'Add text before and after a response body via subrequests',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_addition_filter_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_addition_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_addition_module is a filter that adds text before and after a response. The text is not a literal string: each directive names a URI, nginx runs a subrequest for it, and the body of that subrequest is prepended or appended to the main response.',
            'By default only text/html responses are touched. addition_types (0.7.9) widens this to other MIME types, and the special value "*" matches any MIME type (0.8.29). Passing an empty string ("") to add_before_body or add_after_body cancels an addition inherited from a previous configuration level.',
            'It is an official nginx module. Upstream does not build it by default and enables it with the --with-http_addition_module configure parameter. A typical use is wrapping static HTML pages in a shared header and footer served from another location or an upstream.',
        ],
        highlights: [
            {
                name: 'add_before_body',
                desc: 'Adds the text returned by a subrequest to the given URI before the response body; http, server, location.',
            },
            {
                name: 'add_after_body',
                desc: 'Adds the text returned by a subrequest to the given URI after the response body; http, server, location.',
            },
            {
                name: 'addition_types',
                desc: 'MIME types that may receive additions besides text/html, "*" matches any type; default text/html.',
            },
            {
                name: 'cancel with ""',
                desc: 'An empty string as the parameter cancels an addition inherited from the previous configuration level.',
            },
        ],
        example: `location / {
    root /var/www/site;

    # header and footer come from subrequests
    add_before_body /_parts/header.html;
    add_after_body  /_parts/footer.html;
}

location /_parts/ {
    internal;
    root /var/www/parts;
}`,
    },
    {
        slug: 'flv',
        name: 'ngx_http_flv_module',
        desc: 'Pseudo-streaming for Flash Video (FLV) files',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_flv_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_flv_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_flv_module provides pseudo-streaming server-side support for Flash Video (FLV) files. It lets a player seek into a file without downloading everything that comes before the chosen position.',
            'Requests whose query string carries a start argument are handled specially: nginx sends the file contents from the requested byte offset and prepends the FLV header so the player receives a valid stream. Requests without start are served as ordinary static files.',
            'It is an official nginx module. Upstream does not build it by default and enables it with the --with-http_flv_module configure parameter. A typical use is serving a directory of legacy .flv recordings to players that implement byte-offset seeking.',
        ],
        highlights: [
            {
                name: 'flv',
                desc: 'Turns on module processing in the surrounding location; no parameters, location context only.',
            },
            {
                name: 'start argument',
                desc: 'A start value in the query string selects the byte offset from which the file is sent.',
            },
            {
                name: 'FLV header',
                desc: 'When start is present, the FLV header is prepended to the partial file so the result is a valid stream.',
            },
            {
                name: 'static file fallback',
                desc: 'Requests without a start argument are served as regular static files from the location root.',
            },
        ],
        example: `location ~ \\.flv$ {
    root /var/www/video;

    # /clip.flv?start=1048576 sends from that byte offset
    flv;
}`,
    },
    {
        slug: 'gunzip',
        name: 'ngx_http_gunzip_module',
        desc: 'Decompress gzipped responses for clients without gzip support',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_gunzip_filter_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_gunzip_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_gunzip_module is a filter that decompresses responses carrying "Content-Encoding: gzip" for clients that do not support the gzip encoding method. It is useful when data is stored compressed to save space and reduce I/O costs but must still be readable by every client.',
            'When enabled, gzip_http_version, gzip_proxied and gzip_disable from ngx_http_gzip_module are also consulted to decide whether a client supports gzip, and gzip_vary applies as well. It pairs naturally with gzip_static always, which serves .gz files unconditionally and leaves gunzip to handle the clients that cannot read them. This site also ships Brotli and Zstandard modules (/modules/brotli/ and /modules/zstd/) that serve pre-compressed .br and .zst files in the same way.',
            'It is an official nginx module. Upstream does not build it by default and enables it with the --with-http_gunzip_module configure parameter. A typical use is a storage tree that holds only gzipped objects behind a proxy or cache.',
        ],
        highlights: [
            {
                name: 'gunzip',
                desc: 'Enables or disables decompression of gzipped responses for clients that lack gzip support; default off.',
            },
            {
                name: 'gunzip_buffers',
                desc: 'Number and size of buffers used to decompress a response; default 32 4k or 16 8k, one memory page each.',
            },
            {
                name: 'gzip_* awareness',
                desc: 'gzip_http_version, gzip_proxied and gzip_disable are also taken into account when judging client support.',
            },
            {
                name: 'gzip_vary',
                desc: 'Works with gzip_vary so caches see a Vary: Accept-Encoding header on responses that may be decompressed.',
            },
            {
                name: 'gzip_static always',
                desc: 'Serve only .gz files from disk with gzip_static always and let gunzip decompress for clients that need it.',
            },
        ],
        example: `location /storage/ {
    root /srv;

    # only .gz files exist on disk
    gzip_static always;
    gzip_vary on;

    # decompress for clients that cannot take gzip
    gunzip on;
    gunzip_buffers 32 4k;
}`,
    },
    {
        slug: 'gzip-static',
        name: 'ngx_http_gzip_static_module',
        desc: 'Serve precompressed .gz files instead of compressing on the fly',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_gzip_static_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_gzip_static_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_gzip_static_module sends precompressed files with the ".gz" filename extension instead of the regular files. For a request to /app.js it checks for /app.js.gz and, when the client accepts gzip, serves that file with the matching Content-Encoding and no CPU spent compressing.',
            'gzip_http_version, gzip_proxied, gzip_disable and gzip_vary from ngx_http_gzip_module are taken into account when deciding whether to use the compressed file. The files can be produced with the gzip command or any compatible tool, and upstream recommends keeping the modification date and time of the original and compressed files the same. This site also ships Brotli and Zstandard modules (/modules/brotli/ and /modules/zstd/) that serve pre-compressed .br and .zst files in the same way.',
            'It is an official nginx module. Upstream does not build it by default and enables it with the --with-http_gzip_static_module configure parameter. A typical use is a build pipeline that emits .gz copies of JavaScript, CSS and font assets next to the originals.',
        ],
        highlights: [
            {
                name: 'gzip_static',
                desc: 'Enables (on) or disables (off) checking for precompressed files, or serves them unconditionally (always); default off.',
            },
            {
                name: 'gzip_static always',
                desc: 'Since 1.3.6, uses the gzipped file in all cases without checking client support; pair with gunzip or all-.gz trees.',
            },
            {
                name: '.gz lookup rule',
                desc: 'The compressed variant is the requested filename with a ".gz" extension appended, compressed by gzip or a compatible tool.',
            },
            {
                name: 'gzip_* awareness',
                desc: 'gzip_http_version, gzip_proxied, gzip_disable and gzip_vary are all taken into account.',
            },
            {
                name: 'matching mtime',
                desc: 'Upstream recommends that original and compressed files share the same modification date and time.',
            },
        ],
        example: `location /assets/ {
    root /var/www/site;

    # serve app.js.gz when the client accepts gzip
    gzip_static on;
    gzip_vary on;
    gzip_proxied expired no-cache no-store private auth;

    expires 30d;
}`,
    },
    {
        slug: 'mp4',
        name: 'ngx_http_mp4_module',
        desc: 'Pseudo-streaming and seeking for MP4, M4V and M4A files',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_mp4_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_mp4_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_mp4_module provides server-side pseudo-streaming for MP4 files, typically with the .mp4, .m4v or .m4a extension. A compatible player sends the desired start time in seconds as the start query argument, and nginx answers with a stream whose beginning matches that time, so playback can start or seek anywhere in the timeline.',
            'The end argument (1.5.13) sets the end of playback and can be combined with start. For a request with a non-zero start or end, nginx reads the moov atom metadata, builds a new stream for the requested range and sends it, which costs CPU, memory and disk I/O, especially when the metadata sits at the end of the file. Without start and end the file is sent as a plain static resource with no overhead. If start lands on a non-key frame, mp4_start_key_frame (1.21.4) hides the leading frames with an edit list.',
            'It is an official nginx module that upstream does not build by default; it needs the --with-http_mp4_module configure parameter. A typical use is serving video files to HTML5 or Flash players that seek by time rather than by byte range.',
        ],
        highlights: [
            {
                name: 'mp4',
                desc: 'Turns on module processing in the surrounding location; location context only.',
            },
            {
                name: 'mp4_buffer_size',
                desc: 'Sets the initial size of the buffer used for processing MP4 files, default 512K.',
            },
            {
                name: 'mp4_max_buffer_size',
                desc: 'Upper limit for the metadata buffer, default 10M; a larger moov atom yields a 500 error and a log message.',
            },
            {
                name: 'mp4_start_key_frame',
                desc: 'Forces output to start with a key frame, hiding earlier frames via an edit list (1.21.4), default off.',
            },
            {
                name: 'start and end arguments',
                desc: 'Query arguments in seconds that select the playback range; end appeared in 1.5.13.',
            },
        ],
        example: `location /video/ {
    root /srv/media;

    # enable time-based seeking via ?start= and ?end=
    mp4;
    mp4_buffer_size      1m;
    mp4_max_buffer_size  5m;

    # hide frames before the nearest key frame (1.21.4)
    mp4_start_key_frame  on;
}`,
    },
    {
        slug: 'random-index',
        name: 'ngx_http_random_index_module',
        desc: 'Serve a random file from a directory as its index page',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_random_index_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_random_index_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_random_index_module processes requests whose URI ends with a slash and picks a random file from the matching directory to serve as the index file. Each request may therefore receive a different file from the same directory.',
            'The module runs before ngx_http_index_module, so when it is enabled the ordinary index directive is never reached for a directory that contains at least one candidate file. Entries whose names start with a dot are skipped and only regular files are considered, so subdirectories are ignored; if the directory has no eligible file the request falls through to the index and autoindex handlers.',
            'It is an official nginx module that upstream does not build by default; it needs the --with-http_random_index_module configure parameter. A typical use is rotating banner images, quotes or landing pages without any application code.',
        ],
        highlights: [
            {
                name: 'random_index',
                desc: 'Enables or disables module processing in the surrounding location, default off; location context only.',
            },
            {
                name: 'runs before index',
                desc: 'Processed ahead of ngx_http_index_module, so a random file wins over any configured index file.',
            },
            {
                name: 'hidden files skipped',
                desc: 'Directory entries whose names begin with a dot are never chosen.',
            },
            {
                name: 'regular files only',
                desc: 'Subdirectories are ignored; symlinks are resolved and count only when they point at a regular file.',
            },
            {
                name: 'empty directory fallback',
                desc: 'With no eligible file the module declines and the index or autoindex modules handle the request.',
            },
        ],
        example: `location /banners/ {
    root /srv/www;

    # each request to /banners/ gets a random file from that directory
    random_index on;
}

location / {
    root /srv/www;
    index index.html;
}`,
    },
    {
        slug: 'secure-link',
        name: 'ngx_http_secure_link_module',
        desc: 'Check link authenticity and expiry with MD5 hashes',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_secure_link_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_secure_link_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_secure_link_module (0.7.18) checks the authenticity of requested links, protects resources from unauthorized access and limits link lifetime. It compares a checksum passed in the request with one computed on the server, and if the link carries an expiration time that has passed it is treated as outdated.',
            'There are two operation modes. secure_link_secret checks a hexadecimal MD5 of the link plus a secret word embedded in the URI as /prefix/hash/link. The second mode (0.8.50) uses secure_link and secure_link_md5: the request supplies a base64url MD5 hash and optionally an expiration time in seconds since the Epoch, and the hash is computed over any expression, typically including $uri, $remote_addr, a secret and $secure_link_expires. The outcome is exposed in $secure_link.',
            'It is an official nginx module that upstream does not build by default; it needs the --with-http_secure_link_module configure parameter. A typical use is issuing time-limited download URLs from an application while nginx serves the files directly.',
        ],
        highlights: [
            {
                name: 'secure_link',
                desc: 'String with variables from which the checksum and, after a comma, the expiration time are extracted.',
            },
            {
                name: 'secure_link_md5',
                desc: 'Expression whose MD5 is compared with the hash from the request; should include the resource, a secret and $secure_link_expires.',
            },
            {
                name: 'secure_link_secret',
                desc: 'Secret word for the /prefix/hash/link URI scheme, where hash is the hex MD5 of link plus word; location context only.',
            },
            {
                name: '$secure_link',
                desc: 'Empty on checksum mismatch, "0" when expired, "1" when valid; in secret mode it holds the extracted link.',
            },
            {
                name: '$secure_link_expires',
                desc: 'Expiration time passed in the request, intended only for use inside secure_link_md5.',
            },
        ],
        example: `location /s/ {
    # hash and expiry come from ?md5=...&expires=...
    secure_link $arg_md5,$arg_expires;
    secure_link_md5 "$secure_link_expires$uri$remote_addr secret";

    if ($secure_link = "") {
        return 403;
    }

    if ($secure_link = "0") {
        return 410;
    }

    root /srv/downloads;
}`,
    },
    {
        slug: 'sub',
        name: 'ngx_http_sub_module',
        desc: 'Replace one string with another in response bodies',
        kind: 'static',
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_sub_filter_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_sub_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_sub_module is a filter that modifies a response by replacing one specified string with another. The string to replace is matched ignoring case, and both the search string (1.9.4) and the replacement may contain variables.',
            'Several sub_filter directives can be given at the same level since 1.9.4, and they are inherited from the previous level only when the current level defines none. By default each string is replaced once and only text/html responses are processed; sub_filter_types extends this to other MIME types and sub_filter_last_modified keeps the Last-Modified header that is otherwise dropped. For regular expressions and more flexible multiple substitutions, the third-party module at /modules/subs-filter/ builds on the same idea.',
            'It is an official nginx module that upstream does not build by default; it needs the --with-http_sub_module configure parameter. A typical use is rewriting absolute links or hostnames in HTML coming from a proxied backend.',
        ],
        highlights: [
            {
                name: 'sub_filter',
                desc: 'Sets a string to replace and its replacement; case-insensitive match, variables allowed, repeatable since 1.9.4.',
            },
            {
                name: 'sub_filter_once',
                desc: 'Whether to look for each string once or repeatedly, default on.',
            },
            {
                name: 'sub_filter_types',
                desc: 'Additional MIME types to process besides text/html, default text/html; "*" matches any type (0.8.29).',
            },
            {
                name: 'sub_filter_last_modified',
                desc: 'Preserves the Last-Modified header from the original response to aid caching (1.5.1), default off.',
            },
        ],
        example: `location / {
    proxy_pass http://127.0.0.1:8080;

    # rewrite backend links to the public host
    sub_filter '<a href="http://127.0.0.1:8080/'  '<a href="https://$host/';
    sub_filter '<img src="http://127.0.0.1:8080/' '<img src="https://$host/';
    sub_filter_once off;
    sub_filter_types text/css application/javascript;
}`,
    },
];

import type {ModuleDetail} from './types';

export const groupD: ModuleDetail[] = [
    {
        slug: 'rtmp',
        name: 'rtmp',
        desc: 'RTMP, HLS, and MPEG-DASH live streaming',
        kind: 'dynamic',
        package: 'libnginx-mod-rtmp',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/arut/nginx-rtmp-module',
        docs: 'https://github.com/arut/nginx-rtmp-module/wiki/Directives',
        license: 'BSD-2-Clause',
        overview: [
            'nginx-rtmp-module turns nginx into a live streaming server. It accepts RTMP streams from encoders such as OBS or FFmpeg and can repackage them as HLS or MPEG-DASH for playback in browsers and mobile apps. It also serves video on demand from FLV and MP4 files.',
            'The module supports stream relaying with push and pull, recording streams to disk, HTTP callbacks on publish and play events, and running external commands such as FFmpeg transcoders. A built-in stats handler reports server state as XML.',
            'RTMP configuration lives in its own top-level rtmp block, next to http, not inside it. The module is written by Roman Arutyunyan, an nginx core developer.',
        ],
        highlights: [
            {
                name: 'rtmp { server { application } }',
                desc: 'Defines the RTMP server in its own top-level block, with listen ports and named applications that clients publish to and play from.',
            },
            {
                name: 'live on',
                desc: 'Enables one-to-many live broadcasting for an application, distributing each published stream to all subscribers.',
            },
            {
                name: 'hls on',
                desc: 'Repackages the live stream as HLS segments and playlists in hls_path, served to players over plain HTTP.',
            },
            {
                name: 'dash on',
                desc: 'Produces MPEG-DASH fragments and an MPD manifest for the same stream, written to dash_path.',
            },
            {
                name: 'push / pull',
                desc: 'Relays streams to another RTMP server or fetches them from one on demand, for multi-server distribution.',
            },
            {
                name: 'record',
                desc: 'Writes published streams to FLV files, with options to record all, audio only, video only, or keyframes.',
            },
        ],
        example: `load_module modules/ngx_rtmp_module.so;

rtmp {
    server {
        listen 1935;

        application live {
            live on;
            hls on;
            hls_path /var/www/hls;
            hls_fragment 3s;
        }
    }
}`,
    },
    {
        slug: 'subs-filter',
        name: 'subs-filter',
        desc: 'Regex and string substitution on response bodies',
        kind: 'dynamic',
        package: 'libnginx-mod-http-subs-filter',
        metapackage: 'nginx-full',
        repo: 'https://github.com/yaoweibin/ngx_http_substitutions_filter_module',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_substitutions_filter_module rewrites response bodies on the fly, replacing text by fixed string or regular expression. It is similar to Apache mod_substitute and scans output buffers line by line.',
            'Unlike the stock sub_filter module, it supports regular expressions and multiple substitution rules in one location. Typical uses are fixing absolute URLs behind a reverse proxy, switching http links to https, and masking hostnames in proxied content.',
            'The module is written by Weibin Yao. Responses are filtered only for the MIME types listed in subs_filter_types, text/html by default.',
        ],
        highlights: [
            {
                name: 'subs_filter',
                desc: 'Replaces a source string or regex with a destination string, with flags for global (g), case-insensitive (i), first-match-only (o), and regex (r) matching.',
            },
            {
                name: 'Multiple rules per location',
                desc: 'Several subs_filter directives can apply in the same location, and each line of the response is checked against all of them.',
            },
            {
                name: 'subs_filter_types',
                desc: 'Lists the MIME types to filter, defaulting to text/html; add text/css, text/xml, or others as needed.',
            },
            {
                name: 'subs_filter_bypass',
                desc: 'Skips filtering when a given variable is non-empty and not 0, so substitution can be toggled per request.',
            },
            {
                name: 'Variable support',
                desc: 'Both match and replacement strings may contain nginx variables such as $host, though variables in the match side disable some optimizations.',
            },
        ],
        example: `load_module modules/ngx_http_subs_filter_module.so;

http {
    server {
        location / {
            proxy_pass http://127.0.0.1:8080;
            subs_filter_types text/html text/css;
            subs_filter http://internal.example.com https://www.example.com gi;
            subs_filter foo bar gi;
        }
    }
}`,
    },
    {
        slug: 'uploadprogress',
        name: 'uploadprogress',
        desc: 'Track POST upload progress for progress bars',
        kind: 'dynamic',
        package: 'libnginx-mod-http-uploadprogress',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/masterzen/nginx-upload-progress-module',
        license: 'BSD-2-Clause',
        overview: [
            'nginx-upload-progress-module tracks multipart POST uploads as nginx proxies them to an upstream server. JavaScript on the upload page can poll a progress endpoint and render a progress bar while the file is still transferring.',
            'The client tags each upload with an X-Progress-ID header or query parameter. nginx keeps received and expected byte counts in a shared memory zone and reports them on request as JSONP, plain JSON, or a custom template.',
            'The module is written by Brice Figureau. It only observes the request as it passes through, so the upstream application needs no changes.',
        ],
        highlights: [
            {
                name: 'upload_progress',
                desc: 'Declares a shared memory zone in the http block that holds per-upload progress state.',
            },
            {
                name: 'track_uploads',
                desc: 'Enables tracking for an upload location and keeps finished-upload state around for a configurable timeout; it must be the last directive in the location.',
            },
            {
                name: 'report_uploads',
                desc: 'Serves progress reports from a probe location, returning the received and total byte counts for the upload named by X-Progress-ID.',
            },
            {
                name: 'upload_progress_json_output',
                desc: 'Switches the report format from the default JSONP-style JavaScript to plain JSON.',
            },
            {
                name: 'upload_progress_template',
                desc: 'Customizes the response body per upload state (starting, uploading, done, error) using nginx variables.',
            },
        ],
        example: `load_module modules/ngx_http_uploadprogress_module.so;

http {
    upload_progress uploads 1m;

    server {
        location /upload {
            proxy_pass http://127.0.0.1:8080;
            track_uploads uploads 30s;
        }

        location = /progress {
            report_uploads uploads;
        }
    }
}`,
    },
    {
        slug: 'upstream-fair',
        name: 'upstream-fair',
        desc: 'Least-busy load balancing for upstreams',
        kind: 'dynamic',
        package: 'libnginx-mod-http-upstream-fair',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/itoffshore/nginx-upstream-fair',
        license: 'BSD-2-Clause',
        overview: [
            'nginx-upstream-fair replaces round-robin balancing with a least-busy algorithm. It tracks how many requests each backend is currently handling and sends new requests to the server with the least outstanding work.',
            'This suits backends that handle one request at a time or have uneven response times, where round-robin would queue requests behind a slow server. Peer state is kept in shared memory, so all worker processes share the same view of backend load.',
            'The module was written by Grzegorz Nosek, sponsored by EngineYard. The original repository at gnosek/nginx-upstream-fair is unmaintained; this fork carries patches for current nginx releases and dynamic module builds.',
        ],
        highlights: [
            {
                name: 'fair',
                desc: 'Enables the fair scheduler for an upstream block, picking the backend with the fewest requests in flight.',
            },
            {
                name: 'fair no_rr',
                desc: 'Drops the round-robin warmup behavior and always picks by load, useful when backends must not receive concurrent requests.',
            },
            {
                name: 'fair weight_mode=idle',
                desc: 'Treats server weights as concurrency limits, marking a backend busy once it reaches its weight in active requests.',
            },
            {
                name: 'fair weight_mode=peak',
                desc: 'Enforces server weights as hard caps and returns errors rather than exceeding them, so max_fails and fail_timeout apply.',
            },
            {
                name: 'upstream_fair_shm_size',
                desc: 'Sets the size of the shared memory segment that stores peer state across worker processes.',
            },
        ],
        example: `load_module modules/ngx_http_upstream_fair_module.so;

http {
    upstream backend {
        fair;
        server 127.0.0.1:5000;
        server 127.0.0.1:5001;
        server 127.0.0.1:5002;
    }

    server {
        location / {
            proxy_pass http://backend;
        }
    }
}`,
    },
];

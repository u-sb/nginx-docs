import type {ModuleDetail} from './types';

export const groupC: ModuleDetail[] = [
    {
        slug: 'ipdb',
        name: 'http-ipdb',
        desc: 'Client geolocation variables from ipip.net IPDB files',
        kind: 'dynamic',
        package: 'libnginx-mod-http-ipdb',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/vislee/ngx_http_ipdb_module',
        license: 'GPL-2.0',
        overview: [
            'ngx_http_ipdb_module looks up the client address in an IPDB database file from ipip.net and exposes the result as nginx variables. It covers country, region, city, ISP, coordinates, timezone, and currency fields, each available as its own $ipdb_* variable.',
            'Operators use it the same way as a GeoIP module: route or block traffic by location, pass geolocation headers to upstreams, or log where requests come from. IPDB data is notably detailed for networks in China, which is the common reason to pick it over MaxMind databases.',
            'The module can resolve the real client address behind trusted proxies before the lookup. n.wtf builds this module from source in its own packaging; it is not part of the Debian nginx module set.',
        ],
        highlights: [
            {
                name: 'ipdb',
                desc: 'Sets the path to the IPDB database file and enables the lookup for the http block.',
            },
            {
                name: 'ipdb_language',
                desc: 'Selects the result language, EN or CN, per http, server, or location context.',
            },
            {
                name: 'ipdb_proxy',
                desc: 'Declares a trusted proxy address or CIDR so the lookup uses the address from X-Forwarded-For instead.',
            },
            {
                name: 'ipdb_proxy_recursive',
                desc: 'Walks the X-Forwarded-For chain past multiple trusted proxies to find the original client address.',
            },
            {
                name: '$ipdb_* variables',
                desc: 'Per-request lookup results such as $ipdb_country_name, $ipdb_city_name, $ipdb_isp_domain, and the full record in $ipdb_raw.',
            },
        ],
        example: `load_module modules/ngx_http_ipdb_module.so;

http {
    ipdb /etc/nginx/ipdb/city.free.ipdb;
    ipdb_language EN;

    server {
        listen 80;

        location / {
            proxy_set_header X-Country $ipdb_country_name;
            proxy_set_header X-City    $ipdb_city_name;
            proxy_pass http://backend;
        }
    }
}`,
    },
    {
        slug: 'lua',
        name: 'http-lua',
        desc: 'Script request handling with LuaJIT',
        kind: 'dynamic',
        package: 'libnginx-mod-http-lua',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/openresty/lua-nginx-module',
        license: 'BSD-2-Clause',
        overview: [
            'lua-nginx-module embeds LuaJIT into nginx and runs Lua code inside the request lifecycle. Handlers hook into the rewrite, access, content, header filter, body filter, and log phases. It is the core component of OpenResty.',
            'Lua code runs on the nginx event loop, and the ngx.* API performs network I/O without blocking a worker. That makes it practical to write authentication checks, dynamic routing, request and response rewriting, or full API endpoints in nginx configuration instead of a separate application server.',
            'The module requires the nginx development kit (NDK), so load ndk_http_module.so before ngx_http_lua_module.so. Workers can share state through lua_shared_dict shared memory zones.',
        ],
        highlights: [
            {
                name: 'content_by_lua_block',
                desc: 'Runs Lua as the content handler for a location and generates the response with ngx.say and related calls.',
            },
            {
                name: 'access_by_lua_block',
                desc: 'Runs Lua in the access phase to allow or reject a request, for example custom authentication.',
            },
            {
                name: 'rewrite_by_lua_block',
                desc: 'Runs Lua in the rewrite phase to change the URI, arguments, or other request properties before routing.',
            },
            {
                name: 'set_by_lua_block',
                desc: 'Computes the value of an nginx variable with a short blocking Lua expression.',
            },
            {
                name: 'lua_shared_dict',
                desc: 'Declares a shared memory dictionary that all worker processes can read and write.',
            },
            {
                name: 'init_by_lua_block',
                desc: 'Runs Lua once at configuration load time, before workers fork, to preload modules and shared data.',
            },
        ],
        example: `load_module modules/ndk_http_module.so;
load_module modules/ngx_http_lua_module.so;

http {
    lua_shared_dict counters 1m;

    server {
        listen 80;

        location /hello {
            default_type text/plain;
            content_by_lua_block {
                local hits = ngx.shared.counters:incr("hits", 1, 0)
                ngx.say("hello, visit #", hits)
            }
        }
    }
}`,
    },
    {
        slug: 'nchan',
        name: 'nchan',
        desc: 'Pub/sub messaging over WebSocket and EventSource',
        kind: 'dynamic',
        package: 'libnginx-mod-nchan',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/slact/nchan',
        docs: 'https://nchan.io/',
        license: 'MIT',
        overview: [
            'Nchan turns nginx into a pub/sub message server. Clients subscribe to named channels over WebSocket, EventSource (server-sent events), or long-polling, and messages published to a channel are delivered to every subscriber. The protocol is negotiated per client, so one subscriber endpoint serves browsers and plain HTTP clients alike.',
            'Publishing is a plain HTTP POST, so any backend language can push messages without a client library. This lets an application hand off live updates, chat, or notification fan-out to nginx instead of holding thousands of open connections itself.',
            'Messages are buffered in shared memory by default. A Redis backend adds persistence and lets several nginx servers share the same channels.',
        ],
        highlights: [
            {
                name: 'nchan_publisher',
                desc: 'Marks a location as a publisher endpoint that accepts messages via HTTP POST or WebSocket.',
            },
            {
                name: 'nchan_subscriber',
                desc: 'Marks a location as a subscriber endpoint serving WebSocket, EventSource, and long-poll clients.',
            },
            {
                name: 'nchan_channel_id',
                desc: 'Sets the channel a location publishes to or subscribes from, usually from a variable such as $arg_id.',
            },
            {
                name: 'nchan_pubsub',
                desc: 'Combines publisher and subscriber behavior in a single location.',
            },
            {
                name: 'nchan_message_buffer_length',
                desc: 'Sets how many recent messages each channel keeps for delivery to late or reconnecting subscribers.',
            },
            {
                name: 'nchan_redis_pass',
                desc: 'Stores channel messages in a Redis upstream so multiple nginx servers can share channels.',
            },
        ],
        example: `load_module modules/ngx_nchan_module.so;

http {
    server {
        listen 80;

        location = /pub {
            nchan_publisher;
            nchan_channel_id $arg_id;
        }

        location = /sub {
            nchan_subscriber;
            nchan_channel_id $arg_id;
        }
    }
}`,
    },
    {
        slug: 'ndk',
        name: 'ndk',
        desc: 'Development kit required by other modules',
        kind: 'dynamic',
        package: 'libnginx-mod-http-ndk',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/vision5/ngx_devel_kit',
        license: 'BSD-3-Clause',
        overview: [
            'The nginx development kit (NDK) extends the nginx core with extra APIs for module authors. It is a support module: it adds functions, macros, and build helpers that other third-party modules call, and it exposes no end-user features of its own.',
            'Modules such as lua-nginx-module, set-misc, encrypted-session, and form-input are built against NDK and need it loaded first. On this repository that means keeping the load_module line for ndk_http_module.so ahead of the modules that depend on it.',
            'You install and load NDK only because another module requires it. It needs no configuration beyond the load_module line.',
        ],
        highlights: [
            {
                name: 'set_var submodule',
                desc: 'Lets modules register C functions as nginx variable setters, the mechanism behind directives like set_by_lua and set_md5.',
            },
            {
                name: 'Configuration setters',
                desc: 'Extra conf_set functions for regexes, complex values, script values, and paths that reduce boilerplate in module code.',
            },
            {
                name: 'Utility macros',
                desc: 'Helper macros for common tasks such as null checks and array handling in module source.',
            },
            {
                name: 'ngx_auto_lib_core',
                desc: 'A generic handler that helps module build scripts find and link external libraries.',
            },
            {
                name: 'Dependency for popular modules',
                desc: 'Required at load time by lua-nginx-module, set-misc-nginx-module, encrypted-session, form-input, iconv, and array-var.',
            },
        ],
        example: `# NDK has no directives of its own. Load it before any module
# that depends on it, such as lua-nginx-module.
load_module modules/ndk_http_module.so;
load_module modules/ngx_http_lua_module.so;

http {
    server {
        listen 80;

        location / {
            content_by_lua_block {
                ngx.say("NDK is loaded as a dependency")
            }
        }
    }
}`,
    },
];

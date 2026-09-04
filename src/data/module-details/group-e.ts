import type {ModuleDetail} from './types';

// Official nginx modules compiled into the binary via --with-http_*_module (part 1).
export const groupE: ModuleDetail[] = [
    {
        slug: 'json',
        name: 'ngx_http_json_module',
        desc: 'Extract values from a JSON document into nginx variables',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx',
        docs: 'https://nginx.org/en/docs/http/ngx_http_json_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_json_module reads a JSON document held in any nginx variable and exposes members of it as further variables. A path picks the member: object keys are separated by dots and array elements are addressed by a zero-based index in square brackets, so user.name and tags[0] both work.',
            'The document is parsed once per request no matter how many variables are pulled from it, and only when one of those variables is first accessed. Strings are stored unescaped, numbers, booleans and null exactly as written, and an object or array path yields its whole text. If the member is missing or the source is not a complete, valid JSON document, the variable is simply not found.',
            'It is an official nginx module, new in 1.31.5, and is not built by default upstream. Paired with client_body_early_read and predicate locations from the same release, it routes on request body fields without Lua or njs.',
        ],
        highlights: [
            {
                name: 'json_set',
                desc: 'Sets a variable to the value found at a path in the JSON document held in a source variable; http context.',
            },
            {
                name: 'json_max_depth',
                desc: 'Maximum nesting depth a document may have before it is rejected as invalid, 1 to 256, default 32.',
            },
            {
                name: 'dot and bracket paths',
                desc: 'user.name, items[0], and \'obj["a.b"].c[2]\' for member names containing dots or brackets.',
            },
            {
                name: 'lazy single parse',
                desc: 'One parse per request, done on first access to any extracted variable.',
            },
        ],
        example: `# read JSON bodies before location matching (1.31.5)
map $http_content_type $is_json {
    application/json  1;
}

client_body_early_read $is_json;

json_set $req_method $request_body method;
json_set $first_item $request_body items[0];

# route JSON-RPC style requests by the "method" field
map $req_method $is_search {
    search  1;
}

server {
    listen 8080;

    location $is_search {
        proxy_pass http://search-backend;
    }

    location / {
        proxy_pass http://backend;
    }
}`,
    },
    {
        slug: 'ssl',
        name: 'ngx_http_ssl_module',
        desc: 'HTTPS support with certificates, protocols, ciphers and sessions',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_ssl_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_ssl_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_ssl_module provides the support needed for HTTPS. A server block becomes a TLS server through the ssl parameter of the listen directive, and the module loads the PEM certificate and key, selects the enabled protocols and ciphers, and manages session caching and resumption.',
            'Since 1.11.0 ssl_certificate can be given more than once to serve RSA and ECDSA certificates side by side, and since 1.15.9 the file name may contain variables. The module adds the 495, 496 and 497 error codes for error_page and exposes variables such as $ssl_protocol, $ssl_cipher, $ssl_server_name, $ssl_session_reused, $ssl_early_data and the $ssl_client_* family for client certificates.',
            'It is an official nginx module that requires the OpenSSL library and is not built by default upstream, so it needs the --with-http_ssl_module configure parameter. The typical use is terminating TLS for every public site and API served by nginx.',
        ],
        highlights: [
            {
                name: 'ssl_certificate',
                desc: 'PEM file with the certificate and any intermediates; may be repeated for RSA and ECDSA certificates since 1.11.0.',
            },
            {
                name: 'ssl_certificate_key',
                desc: 'PEM file with the secret key; engine:, store: and data:$variable forms are also accepted.',
            },
            {
                name: 'ssl_protocols',
                desc: 'Enables the listed protocol versions, default TLSv1.2 TLSv1.3 (TLSv1.3 by default since 1.23.4).',
            },
            {
                name: 'ssl_ciphers',
                desc: 'Cipher list in OpenSSL format, default HIGH:!aNULL:!MD5.',
            },
            {
                name: 'ssl_session_cache',
                desc: 'Session parameter cache; default none, shared:name:size is recommended and holds about 4000 sessions per megabyte.',
            },
            {
                name: 'ssl_stapling',
                desc: 'Enables stapling of OCSP responses by the server, default off; needs a resolver and the issuer certificate.',
            },
        ],
        example: `server {
    listen              443 ssl;
    server_name         example.com;

    ssl_certificate     /etc/nginx/ssl/example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/example.com.key;

    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # shared cache across workers, 1m holds about 4000 sessions
    ssl_session_cache   shared:SSL:10m;
    ssl_session_timeout 10m;

    ssl_stapling        on;
    ssl_stapling_verify on;
    resolver            192.0.2.1;
}`,
    },
    {
        slug: 'stub-status',
        name: 'ngx_http_stub_status_module',
        desc: 'Basic connection and request counters on a status page',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_stub_status_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_stub_status_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_stub_status_module provides access to basic status information. A location carrying the stub_status directive returns a small plain text page with the number of active connections, the totals of accepted and handled connections and requests, and how many connections are currently reading, writing or waiting.',
            'accepts and handled are normally equal unless a resource limit such as worker_connections was reached. The same numbers are available as the $connections_active, $connections_reading, $connections_writing and $connections_waiting variables (1.3.14). Before 1.7.5 the directive required an arbitrary argument such as stub_status on.',
            'It is an official nginx module and is not built by default upstream, so it needs the --with-http_stub_status_module configure parameter. It is the usual data source for monitoring agents and Prometheus exporters, normally restricted to localhost or a monitoring network.',
        ],
        highlights: [
            {
                name: 'stub_status',
                desc: 'Serves the basic status page from the surrounding location; server or location context, no arguments since 1.7.5.',
            },
            {
                name: 'Active connections',
                desc: 'Current number of active client connections, including Waiting connections.',
            },
            {
                name: 'accepts, handled, requests',
                desc: 'Totals of accepted connections, handled connections and client requests since start.',
            },
            {
                name: 'Reading, Writing, Waiting',
                desc: 'Connections currently reading a request header, writing a response, or idle waiting for a request.',
            },
            {
                name: '$connections_active',
                desc: 'Variable equal to the Active connections value; reading, writing and waiting variants also exist (1.3.14).',
            },
        ],
        example: `server {
    listen 127.0.0.1:8080;

    # expose counters to local monitoring agents only
    location = /basic_status {
        stub_status;
        allow 127.0.0.1;
        deny  all;
    }
}`,
    },
    {
        slug: 'realip',
        name: 'ngx_http_realip_module',
        desc: 'Restore the client address from a proxy header or PROXY protocol',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_realip_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_realip_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_realip_module changes the client address, and optionally the client port, to the values sent in a specified header field. It is used when nginx sits behind a load balancer, CDN or other proxy and the address seen on the socket belongs to that proxy rather than to the visitor.',
            'Replacement happens only for connections coming from addresses listed with set_real_ip_from, which accepts an address, a CIDR range, a hostname (1.13.1) or unix: for all UNIX-domain sockets. With real_ip_recursive on, the last address in the header that is not trusted is used instead of the last address. The original values stay available in $realip_remote_addr (1.9.7) and $realip_remote_port (1.11.0).',
            'It is an official nginx module and is not built by default upstream, so it needs the --with-http_realip_module configure parameter. A typical use is reading X-Forwarded-For behind a CDN so that access logs, access rules and rate limits see the real visitor address.',
        ],
        highlights: [
            {
                name: 'set_real_ip_from',
                desc: 'Defines trusted addresses known to send correct replacement addresses: address, CIDR, hostname or unix:.',
            },
            {
                name: 'real_ip_header',
                desc: 'Header field whose value replaces the client address, default X-Real-IP; proxy_protocol uses the PROXY header.',
            },
            {
                name: 'real_ip_recursive',
                desc: 'When on, uses the last non-trusted address from the header instead of the last address, default off.',
            },
            {
                name: '$realip_remote_addr',
                desc: 'Keeps the original client address as seen on the connection (1.9.7).',
            },
            {
                name: '$realip_remote_port',
                desc: 'Keeps the original client port (1.11.0).',
            },
        ],
        example: `server {
    listen 80;

    # only trust the address chain when the connection comes from our proxies
    set_real_ip_from  192.168.1.0/24;
    set_real_ip_from  192.168.2.1;
    set_real_ip_from  2001:0db8::/32;
    real_ip_header    X-Forwarded-For;
    real_ip_recursive on;

    location / {
        proxy_pass http://backend;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`,
    },
    {
        slug: 'auth-request',
        name: 'ngx_http_auth_request_module',
        desc: 'Authorize requests with a subrequest to an external service',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_auth_request_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_auth_request_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_auth_request_module implements client authorization based on the result of a subrequest. Before serving a protected location nginx sends a subrequest to the configured URI: a 2xx response allows access, 401 or 403 denies it with the same code, and any other code is treated as an error.',
            'For a 401 the client also receives the WWW-Authenticate header from the subrequest response. auth_request_set copies values from the authorization response, such as $upstream_http_* headers, into request variables for use in later proxying. The module appeared in 1.5.4 and can be combined with ngx_http_access_module and ngx_http_auth_basic_module through the satisfy directive.',
            'It is an official nginx module and is not built by default upstream, so it needs the --with-http_auth_request_module configure parameter. A typical use is putting single sign-on or an OAuth2 proxy in front of internal applications that have no authentication of their own.',
        ],
        highlights: [
            {
                name: 'auth_request',
                desc: 'Enables subrequest authorization and sets the URI the subrequest is sent to, default off.',
            },
            {
                name: 'auth_request_set',
                desc: 'Sets a request variable after the authorization request completes; the value may use $upstream_http_*.',
            },
            {
                name: 'response code handling',
                desc: '2xx allows access, 401 or 403 denies it with that code, any other code is considered an error.',
            },
            {
                name: 'satisfy',
                desc: 'Combines auth_request with access and auth_basic checks so any or all of them must pass.',
            },
        ],
        example: `location /private/ {
    auth_request     /auth;
    # pass the identity returned by the auth service to the backend
    auth_request_set $auth_user $upstream_http_x_auth_user;
    proxy_set_header X-Auth-User $auth_user;
    proxy_pass       http://app;
}

location = /auth {
    internal;
    proxy_pass              http://auth-service/verify;
    proxy_pass_request_body off;
    proxy_set_header        Content-Length "";
    proxy_set_header        X-Original-URI $request_uri;
}`,
    },
    {
        slug: 'http2',
        name: 'ngx_http_v2_module',
        desc: 'Serve HTTP/2 over TLS with ALPN or over cleartext TCP',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/v2/ngx_http_v2_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_v2_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_v2_module provides support for HTTP/2 (RFC 9113). Since 1.25.1 it is switched on with the http2 directive in the http or server context rather than a listen parameter, and applies to every listen socket in that server.',
            'Accepting HTTP/2 over TLS relies on the ALPN extension, available since OpenSSL 1.0.2, and if ssl_prefer_server_ciphers is on the cipher list must comply with the RFC 9113 Appendix A black list. The $http2 variable holds the negotiated identifier, h2 over TLS, h2c over cleartext, or an empty string. Server push and several protocol-specific timeouts were made obsolete in 1.25.1 and 1.19.7, with early_hints, keepalive_timeout and client_header_timeout taking their place.',
            'It is an official nginx module, present since 1.9.5, and is not built by default upstream, so it needs the --with-http_v2_module configure parameter. Its typical use is enabling multiplexed HTTPS on any server block that already has a TLS certificate.',
        ],
        highlights: [
            {
                name: 'http2',
                desc: 'Enables the HTTP/2 protocol for a server, default off; appeared in 1.25.1.',
            },
            {
                name: 'http2_max_concurrent_streams',
                desc: 'Sets the maximum number of concurrent HTTP/2 streams in one connection, default 128.',
            },
            {
                name: 'http2_body_preread_size',
                desc: 'Per-request buffer where the request body may be saved before processing starts, default 64k.',
            },
            {
                name: 'http2_chunk_size',
                desc: 'Maximum size of the chunks the response body is sliced into, default 8k; too high impairs prioritization.',
            },
            {
                name: 'http2_recv_buffer_size',
                desc: 'Size of the per-worker input buffer, http context only, default 256k.',
            },
            {
                name: '$http2',
                desc: 'Negotiated protocol identifier: h2 over TLS, h2c over cleartext TCP, or an empty string.',
            },
        ],
        example: `server {
    listen 443 ssl;
    server_name example.com;

    # enable HTTP/2 for every listen socket in this server (1.25.1+)
    http2 on;

    ssl_certificate     /etc/ssl/example.com.crt;
    ssl_certificate_key /etc/ssl/example.com.key;

    http2_max_concurrent_streams 128;

    location / {
        # $http2 is "h2", "h2c" or empty
        add_header X-Protocol $http2 always;
        root /var/www/example.com;
    }
}`,
    },
    {
        slug: 'http3',
        name: 'ngx_http_v3_module',
        desc: 'Serve HTTP/3 over QUIC alongside HTTPS on the same port',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/v3/ngx_http_v3_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_v3_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_v3_module provides experimental support for HTTP/3 (RFC 9114) over QUIC. A server accepts it through a listen socket with the quic parameter, and the docs recommend using the same port for HTTP/3 and HTTPS and advertising it to clients with an Alt-Svc response header.',
            'QUIC needs a TLS library with QUIC support: upstream requires OpenSSL 1.1.1 or higher, 0-RTT needs OpenSSL 3.5.1 or higher (before 1.29.1 it could not be enabled with OpenSSL at all), and BoringSSL, LibreSSL or QuicTLS are the alternatives. The n.wtf build links OpenSSL statically, so the module works regardless of the system libssl. The $http3 variable reports h3 for HTTP/3 connections, hq for hq connections, or an empty string, and quic_bpf can route packets with eBPF on Linux 5.7+ to support connection migration.',
            'It is an official nginx module, present since 1.25.0, and is not built by default upstream, so it needs the --with-http_v3_module configure parameter. The usual deployment is adding a quic listener next to the existing ssl listener so browsers upgrade to HTTP/3 on their next visit.',
        ],
        highlights: [
            {
                name: 'http3',
                desc: 'Enables HTTP/3 protocol negotiation on quic listen sockets, default on.',
            },
            {
                name: 'http3_max_concurrent_streams',
                desc: 'Sets the maximum number of concurrent HTTP/3 request streams in a connection, default 128.',
            },
            {
                name: 'http3_stream_buffer_size',
                desc: 'Size of the buffer used for reading and writing QUIC streams, default 64k.',
            },
            {
                name: 'quic_retry',
                desc: 'Enables QUIC address validation with Retry packets and NEW_TOKEN frames, default off.',
            },
            {
                name: 'quic_gso',
                desc: 'Sends packets in optimized batch mode using segmentation offloading (Linux UDP_SEGMENT), default off.',
            },
            {
                name: 'quic_host_key',
                desc: 'File with the secret key for stateless reset and address validation tokens; by default a random key per reload.',
            },
        ],
        example: `server {
    # for better compatibility use the same port for HTTP/3 and HTTPS
    listen 443 quic reuseport;
    listen 443 ssl;
    server_name example.com;

    http2 on;
    http3 on;
    quic_retry on;

    ssl_certificate     /etc/ssl/example.com.crt;
    ssl_certificate_key /etc/ssl/example.com.key;

    location / {
        # advertise the availability of HTTP/3
        add_header Alt-Svc 'h3=":443"; ma=86400';
        root /var/www/example.com;
    }
}`,
    },
    {
        slug: 'dav',
        name: 'ngx_http_dav_module',
        desc: 'File management over WebDAV with PUT, DELETE, MKCOL, COPY and MOVE',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_dav_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_dav_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_dav_module is intended for file management automation via the WebDAV protocol. It processes the HTTP and WebDAV methods PUT, DELETE, MKCOL, COPY and MOVE against files under the location\'s root.',
            'A file uploaded with PUT is first written to a temporary file and then renamed, so the docs recommend keeping client_body_temp_path on the same file system as the destination to avoid a cross-device copy; the "Date" request header can set the modification time. The module does not implement PROPFIND, OPTIONS or LOCK, so clients that require additional WebDAV methods will not work with it alone. The third-party dav-ext module at /modules/dav-ext/ adds the missing methods.',
            'It is an official nginx module and is not built by default upstream, so it needs the --with-http_dav_module configure parameter. Combined with limit_except it is a common way to accept uploads from scripts or backup tools into a directory that nginx also serves.',
        ],
        highlights: [
            {
                name: 'dav_methods',
                desc: 'Allows the listed methods from PUT, DELETE, MKCOL, COPY and MOVE; default off denies all of them.',
            },
            {
                name: 'dav_access',
                desc: 'Sets permissions for newly created files and directories as user:, group: and all: entries, default user:rw.',
            },
            {
                name: 'create_full_put_path',
                desc: 'Lets PUT create all missing intermediate directories instead of only files in existing ones, default off.',
            },
            {
                name: 'min_delete_depth',
                desc: 'Allows DELETE only when the request path has at least this many elements, default 0.',
            },
        ],
        example: `location /uploads/ {
    root                  /data/www;
    client_body_temp_path /data/client_temp;

    dav_methods PUT DELETE MKCOL COPY MOVE;

    create_full_put_path  on;
    dav_access            group:rw  all:r;
    min_delete_depth      2;

    # only the internal network may modify files
    limit_except GET {
        allow 192.168.1.0/24;
        deny  all;
    }
}`,
    },
    {
        slug: 'slice',
        name: 'ngx_http_slice_module',
        desc: 'Split large proxied responses into cacheable byte-range slices',
        kind: 'static',
        official: true,
        repo: 'https://github.com/nginx/nginx/blob/master/src/http/modules/ngx_http_slice_filter_module.c',
        docs: 'https://nginx.org/en/docs/http/ngx_http_slice_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_http_slice_module is a filter that splits a request into subrequests, each returning a certain byte range of the response. This provides more effective caching of big responses, because each slice is fetched and stored independently.',
            'The module exposes $slice_range, the current slice in HTTP byte range format such as bytes=0-1048575. For a subrequest to return the right range that variable must be passed to the upstream as the Range header with proxy_set_header, and when caching is on it must also be part of proxy_cache_key and 206 responses must be made cacheable with proxy_cache_valid. Setting slice too low may cause excessive memory usage and a large number of open files.',
            'It is an official nginx module, present since 1.9.8, and is not built by default upstream, so it needs the --with-http_slice_module configure parameter. Its typical use is a caching proxy in front of large downloads or video files where clients seek with range requests.',
        ],
        highlights: [
            {
                name: 'slice',
                desc: 'Sets the size of each slice; default 0 disables splitting responses into slices.',
            },
            {
                name: '$slice_range',
                desc: 'The current slice range in HTTP byte range format, for example bytes=0-1048575.',
            },
            {
                name: 'proxy_set_header Range $slice_range',
                desc: 'Passes the slice range to the proxied server so each subrequest returns only the needed bytes.',
            },
            {
                name: 'proxy_cache_key with $slice_range',
                desc: 'Adds the slice range to the cache key so every slice is stored as a separate cache entry.',
            },
            {
                name: 'proxy_cache_valid 200 206',
                desc: 'Makes the partial 206 responses returned for each slice cacheable alongside full 200 responses.',
            },
        ],
        example: `location / {
    # split the response into 1-megabyte cacheable slices
    slice             1m;

    proxy_cache       cache;
    proxy_cache_key   $uri$is_args$args$slice_range;
    proxy_set_header  Range $slice_range;
    proxy_cache_valid 200 206 1h;

    proxy_pass        http://localhost:8000;
}`,
    },
    {
        slug: 'mail',
        name: 'ngx_mail_module',
        desc: 'IMAP, POP3 and SMTP proxy with HTTP-backed authentication',
        kind: 'dynamic',
        official: true,
        package: 'libnginx-mod-mail',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/nginx/nginx/tree/master/src/mail',
        docs: 'https://nginx.org/en/docs/mail/ngx_mail_core_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_mail_module turns nginx into a proxy for IMAP, POP3 and SMTP. A mail block holds one server per listening port, the protocol directive (or the well-known port) picks the protocol, and every client login is checked by an HTTP request to the authentication server named in auth_http. That server answers with Auth-Status, Auth-Server and Auth-Port headers, so it decides both whether the login is valid and which backend the session is proxied to.',
            'ngx_mail_ssl_module adds TLS to the proxy: the ssl parameter of listen gives implicit TLS on ports such as 993 and 995, while starttls on or only controls the STLS and STARTTLS commands on plain ports. The auth_http request carries Client-IP, Auth-Login-Attempt and, since 1.7.11, Auth-SSL-* headers describing the client TLS session, and an Auth-Wait header in a failure response delays the next attempt instead of closing the connection. max_errors (1.21.0) closes a connection after 5 protocol errors by default.',
            'It is an official nginx module that upstream does not build by default; it needs --with-mail and --with-mail_ssl_module. The n.wtf packages build it as a dynamic module shipped in libnginx-mod-mail, which the nginx-extras metapackage pulls in. The typical use is a single TLS front end for several mail stores, with the login check done by a small web service.',
        ],
        highlights: [
            {
                name: 'listen',
                desc: 'Address and port of the server; the ssl parameter enables implicit TLS and proxy_protocol accepts the PROXY protocol.',
            },
            {
                name: 'protocol',
                desc: 'Selects imap, pop3 or smtp; if omitted it is detected from ports 143/993, 110/995 and 25/587/465.',
            },
            {
                name: 'auth_http',
                desc: 'URL of the HTTP authentication server that validates logins and names the backend server and port.',
            },
            {
                name: 'starttls',
                desc: 'Controls STLS and STARTTLS: off denies them, on allows them, only requires TLS before login; default off.',
            },
            {
                name: 'ssl_certificate',
                desc: 'PEM certificate for the mail server; may be repeated for RSA and ECDSA certificates since 1.11.0.',
            },
            {
                name: 'server_name',
                desc: 'Name used in the POP3/SMTP greeting, the CRAM-MD5 salt and the EHLO to the backend; default is the hostname.',
            },
        ],
        example: `mail {
    server_name mail.example.com;
    auth_http   127.0.0.1:9000/auth;

    ssl_certificate     /etc/nginx/ssl/mail.example.com.crt;
    ssl_certificate_key /etc/nginx/ssl/mail.example.com.key;

    # IMAP with optional STARTTLS on 143, implicit TLS on 993
    server {
        listen   143;
        protocol imap;
        starttls on;
    }

    server {
        listen   993 ssl;
        protocol imap;
    }

    # submission port, TLS required before login
    server {
        listen   587;
        protocol smtp;
        starttls only;
    }
}`,
    },
    {
        slug: 'stream',
        name: 'ngx_stream_module',
        desc: 'TCP and UDP proxying with TLS termination and SNI preread',
        kind: 'dynamic',
        official: true,
        package: 'libnginx-mod-stream',
        metapackage: 'nginx',
        repo: 'https://github.com/nginx/nginx/tree/master/src/stream',
        docs: 'https://nginx.org/en/docs/stream/ngx_stream_core_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_stream_module (1.9.0) proxies raw TCP and UDP connections. A stream block holds servers that listen on a port, optionally with the udp parameter (1.9.13) for datagrams, and hand each session to a proxied server or an upstream group, with load balancing, health checking and PROXY protocol support on both sides.',
            'ngx_stream_ssl_module terminates TLS on a listen port with the ssl parameter, and ngx_stream_ssl_preread_module (1.11.5) reads the ClientHello without terminating TLS, exposing $ssl_preread_server_name, $ssl_preread_alpn_protocols (1.13.10) and $ssl_preread_protocol (1.15.2) so a map can route by SNI, ALPN or protocol version. Since 1.25.5 stream servers also support server_name based on SNI. Variables such as $protocol, $status, $session_time and $proxy_protocol_addr have been available since 1.11.2 and 1.11.4.',
            'It is an official nginx module that upstream does not build by default; it needs --with-stream, --with-stream_ssl_module and --with-stream_ssl_preread_module. The n.wtf packages build it as a dynamic module shipped in libnginx-mod-stream, and the base nginx metapackage depends on it, so every n.wtf install has it. Typical uses are forwarding DNS, database or mail ports and sharing port 443 between TLS services by SNI.',
        ],
        highlights: [
            {
                name: 'listen',
                desc: 'Port the server accepts on; udp (1.9.13) handles datagrams and should be combined with reuseport, ssl enables TLS.',
            },
            {
                name: 'proxy_pass',
                desc: 'Address of the proxied server or upstream group; the value may contain variables so a map can choose the target.',
            },
            {
                name: 'ssl_preread',
                desc: 'Extracts SNI, ALPN and protocol version from the ClientHello at the preread phase without terminating TLS; default off.',
            },
            {
                name: '$ssl_preread_server_name',
                desc: 'Server name requested through SNI, available while ssl_preread is on; the usual key for routing port 443 by host.',
            },
            {
                name: 'proxy_protocol',
                desc: 'listen parameter (1.11.4) that expects a PROXY protocol header; version 2 is supported since 1.13.11.',
            },
            {
                name: 'resolver',
                desc: 'Name servers used to resolve upstream names, with valid=time to override the TTL; default port 53.',
            },
        ],
        example: `stream {
    # route TLS by SNI without terminating it
    map $ssl_preread_server_name $backend {
        mail.example.com  192.168.0.10:993;
        default           192.168.0.20:443;
    }

    server {
        listen      443;
        ssl_preread on;
        proxy_pass  $backend;
    }

    # plain UDP forwarding, for example DNS
    server {
        listen     53 udp reuseport;
        proxy_pass 192.168.0.53:53;
    }
}`,
    },
    {
        slug: 'stream-geoip',
        name: 'ngx_stream_geoip_module',
        desc: 'Client country and city variables for stream servers',
        kind: 'dynamic',
        official: true,
        package: 'libnginx-mod-stream-geoip',
        metapackage: 'nginx-extras',
        repo: 'https://github.com/nginx/nginx/blob/master/src/stream/ngx_stream_geoip_module.c',
        docs: 'https://nginx.org/en/docs/stream/ngx_stream_geoip_module.html',
        license: 'BSD-2-Clause',
        overview: [
            'ngx_stream_geoip_module (1.11.3) creates variables whose values depend on the client IP address, looked up in the precompiled legacy MaxMind databases. geoip_country provides $geoip_country_code, $geoip_country_code3 and $geoip_country_name, geoip_city adds region, city, postal code, continent and coordinates, and geoip_org provides $geoip_org.',
            'The directives are set once in the stream context and the variables are then available in every stream server, most often through a map that picks an upstream by $geoip_country_code or $geoip_city_continent_code. With IPv6-enabled databases, IPv4 clients are looked up as IPv4-mapped IPv6 addresses. The legacy GeoIP databases it reads have been discontinued by MaxMind, so new deployments should use the GeoIP2 module at /modules/geoip2/ instead.',
            'It is an official nginx module that upstream does not build by default; it needs --with-stream_geoip_module and the MaxMind GeoIP library. The n.wtf packages build it as a dynamic module shipped in libnginx-mod-stream-geoip, which depends on libnginx-mod-stream and is pulled in by the nginx-extras metapackage. The typical use is steering TCP sessions to the nearest region while an existing legacy database is still in service.',
        ],
        highlights: [
            {
                name: 'geoip_country',
                desc: 'Database file used to determine the country of the client address; stream context only.',
            },
            {
                name: 'geoip_city',
                desc: 'Database file that yields country, region, city, postal code, continent code, latitude and longitude.',
            },
            {
                name: 'geoip_org',
                desc: 'Database file that sets $geoip_org to the organization name for the client address.',
            },
            {
                name: '$geoip_country_code',
                desc: 'Two-letter country code such as US or DE; $geoip_country_code3 gives the three-letter form.',
            },
            {
                name: '$geoip_city_continent_code',
                desc: 'Two-letter continent code such as EU or NA from the city database, handy for choosing a regional upstream.',
            },
        ],
        example: `stream {
    geoip_country /usr/share/GeoIP/GeoIP.dat;

    # send clients to a regional backend by country
    map $geoip_country_code $backend {
        default  us.example.com:12345;
        DE       eu.example.com:12345;
        FR       eu.example.com:12345;
        JP       ap.example.com:12345;
    }

    server {
        listen     12345;
        proxy_pass $backend;
    }
}`,
    },
];

// Third-party modules baked into the n.wtf builds — the --add-module /
// --add-dynamic-module list from `nginx -V` (see src/pages/intro.astro).
// Packaging sources: https://github.com/u-sb/nginx-source
export interface NginxModule {
    name: string;
    desc: string;
    url: string;
}

export const modules: NginxModule[] = [
    // Static (--add-module)
    {name: 'ngx_brotli', desc: 'Brotli compression', url: 'https://github.com/google/ngx_brotli'},
    {name: 'zstd-nginx-module', desc: 'Zstandard compression', url: 'https://github.com/tokers/zstd-nginx-module'},
    {name: 'nginx-acme', desc: 'Automatic TLS certs', url: 'https://github.com/nginx/nginx-acme'},
    // Dynamic (--add-dynamic-module)
    {name: 'headers-more', desc: 'Fine header control', url: 'https://github.com/openresty/headers-more-nginx-module'},
    {name: 'auth-pam', desc: 'PAM authentication', url: 'https://github.com/sto/ngx_http_auth_pam_module'},
    {name: 'cache-purge', desc: 'Purge cached content', url: 'https://github.com/FRiCKLE/ngx_cache_purge'},
    {name: 'dav-ext', desc: 'Extended WebDAV', url: 'https://github.com/arut/nginx-dav-ext-module'},
    {name: 'ndk', desc: 'Nginx Development Kit', url: 'https://github.com/vision5/ngx_devel_kit'},
    {name: 'echo', desc: 'Echo & request helpers', url: 'https://github.com/openresty/echo-nginx-module'},
    {name: 'fancyindex', desc: 'Pretty dir listings', url: 'https://github.com/aperezdc/ngx-fancyindex'},
    {name: 'http-geoip2', desc: 'MaxMind GeoIP2', url: 'https://github.com/leev/ngx_http_geoip2_module'},
    {name: 'http-ipdb', desc: 'IPDB geolocation', url: 'https://github.com/vislee/ngx_http_ipdb_module'},
    {name: 'nchan', desc: 'Pub/sub messaging', url: 'https://github.com/slact/nchan'},
    {name: 'http-lua', desc: 'Lua scripting', url: 'https://github.com/openresty/lua-nginx-module'},
    {name: 'rtmp', desc: 'Media streaming', url: 'https://github.com/arut/nginx-rtmp-module'},
    {name: 'uploadprogress', desc: 'Upload progress tracking', url: 'https://github.com/masterzen/nginx-upload-progress-module'},
    {name: 'upstream-fair', desc: 'Fair load balancing', url: 'https://github.com/itoffshore/nginx-upstream-fair'},
    {name: 'subs-filter', desc: 'Response text substitution', url: 'https://github.com/yaoweibin/ngx_http_substitutions_filter_module'},
];

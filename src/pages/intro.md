---
title: Introduction
---

# Introduction

## What is it?

`n.wtf` is a customized packaged version of famous [Nginx](https://nginx.org/) web server.

## Why do we make it?

Official Debian and Ubuntu releases are usually based on Nginx stable branch. While with stable branch you get a more stable API and expected behavior, you also lack the latest features that are implemented in the mainline branch.

To enjoy the latest feature, you would normally have to compile and maintain the software by yourself. Now you don't have to do that any more, as we are providing and maintaining it for you. Simply include our repository in your source and enjoy the convenient rolling updates provided by our specialist.

If you have heard about TLS 1.3, you would know that it comes with great improvement on performance and web security. Unfortunately most distributions are not ready for TLS 1.3, which means you may have to keep using the old protocol. We understand your concern, and that's why we packed OpenSSL 3.1.x into our nginx as standard. Now TLS 1.3 is available to all of you regardless of what your distribution supports. As a bonus, HTTP3 is also available in the packages we provide.

On top of all those, we also include some extra modules that we think are handy to use.

## How do we make it?

We utilize the [official debian packaging scripts](https://salsa.debian.org/nginx-team/nginx) while pulling the latest mainline branch from [Nginx official](http://nginx.org/en/download.html). You get the same experience as Debian / Ubuntu official nginx packages, except that you'll get the latest release.

We use docker script to create packages in a controlled Linux environment. We compile and maintain packages for each distribution we support to ensure ABI and API compatibility. We always pull the latest OpenSSL 3.3.x releases before packaging to ensure known bug fixes are properly included.

In case of an emergency security issue or a critical bug, we may include a patch from an unreleased version into current version and release beforehand.

## Current Version

- Nginx 1.27.3
- OpenSSL 3.4.0

## Features

Everything from Debian / Ubuntu official builds are included, with the following nginx modules being added to full and extras flavor:

* [ngx_brotli](https://github.com/google/ngx_brotli)
* [ngx_http_geoip2_module](https://github.com/leev/ngx_http_geoip2_module)
* [ngx_http_ipdb_module](https://github.com/vislee/ngx_http_ipdb_module)
* QUIC / HTTP3

Statically built with OpenSSL 3.4.x, so you can use TLS 1.3 even on distributions that don't have OpenSSL.

Version info:

```bash
nginx version: nginx-n.wtf/1.27.3
built with OpenSSL 3.4.0 22 Oct 2024
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -ffile-prefix-map=/build/nginx=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -fPIC' --with-openssl=/build/nginx/../openssl --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-compat --with-debug --with-pcre-jit --without-pcre2 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_v3_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_flv_module --with-http_geoip_module=dynamic --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_mp4_module --with-http_perl_module=dynamic --with-http_random_index_module --with-http_secure_link_module --with-http_sub_module --with-http_xslt_module=dynamic --with-mail=dynamic --with-mail_ssl_module --with-stream=dynamic --with-stream_geoip_module=dynamic --with-stream_ssl_module --with-stream_ssl_preread_module --add-module=/build/nginx/sb-modules/ngx_brotli --add-dynamic-module=/build/nginx/debian/modules/http-headers-more-filter --add-dynamic-module=/build/nginx/debian/modules/http-auth-pam --add-dynamic-module=/build/nginx/debian/modules/http-cache-purge --add-dynamic-module=/build/nginx/debian/modules/http-dav-ext --add-dynamic-module=/build/nginx/debian/modules/http-ndk --add-dynamic-module=/build/nginx/debian/modules/http-echo --add-dynamic-module=/build/nginx/debian/modules/http-fancyindex --add-dynamic-module=/build/nginx/debian/modules/http-geoip2 --add-dynamic-module=/build/nginx/sb-modules/ngx_http_ipdb_module --add-dynamic-module=/build/nginx/debian/modules/nchan --add-dynamic-module=/build/nginx/debian/modules/http-lua --add-dynamic-module=/build/nginx/debian/modules/rtmp --add-dynamic-module=/build/nginx/debian/modules/http-uploadprogress --add-dynamic-module=/build/nginx/debian/modules/http-upstream-fair --add-dynamic-module=/build/nginx/debian/modules/http-subs-filter
```

## Installation

[Install now or get docker image.](/install/)

## Mirrors

[View mirrors](/mirrors/)

## Changelog

[View changelogs](/changelog/)

## Contact

```text
https://u.sb/contact/
```

## License and Trademark

We distribute this software under the MIT license.

[nginx](http://nginx.org/en/) is an open-source HTTP and reverse proxy server, a mail proxy server, and a generic TCP/UDP proxy server distributed under the 2-clause BSD-like license.

NGINX is a trademark of F5 NETWORKS, INC.

This project simply distributes Nginx binaries packages and is not sponsored by or affiliated with Nginx official or F5, Inc.

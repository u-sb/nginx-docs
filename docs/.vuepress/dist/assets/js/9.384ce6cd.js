(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{369:function(e,t,a){"use strict";a.r(t);var i=a(42),n=Object(i.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"guide"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#guide"}},[e._v("#")]),e._v(" Guide")]),e._v(" "),a("h2",{attrs:{id:"what-is-it"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#what-is-it"}},[e._v("#")]),e._v(" What is it?")]),e._v(" "),a("p",[e._v("sb-nginx is a customized packaged version of famous "),a("a",{attrs:{href:"https://nginx.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nginx"),a("OutboundLink")],1),e._v(" web server.")]),e._v(" "),a("h2",{attrs:{id:"why-do-we-make-it"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#why-do-we-make-it"}},[e._v("#")]),e._v(" Why do we make it?")]),e._v(" "),a("p",[e._v("Official Debian and Ubuntu releases are usually based on Nginx stable branch. While with stable branch you get a more stable API and expected behavior, you also lack the latest features that are implemented in the mainline branch.")]),e._v(" "),a("p",[e._v("To enjoy the latest feature, you would normally have to compile and maintain the software by yourself. Now you don't have to do that any more, as we are providing and maintaining it for you. Simply include our repository in your source and enjoy the convenient rolling updates provided by our specialist.")]),e._v(" "),a("p",[e._v("If you have heard about TLS 1.3, you would know that it comes with great improvement on performance and web security. Unfortunately most distributions are not ready for TLS 1.3, which means you may have to keep using the old protocol. We understand your concern, and that's why we packed OpenSSL 1.1.1 into our nginx as standard. Now TLS 1.3 is available to all of you regardless of what your distribution supports.")]),e._v(" "),a("p",[e._v("On top of all those, we also include some extra modules that we think are handy to use.")]),e._v(" "),a("h2",{attrs:{id:"how-do-we-make-it"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#how-do-we-make-it"}},[e._v("#")]),e._v(" How do we make it?")]),e._v(" "),a("p",[e._v("We utilize the "),a("a",{attrs:{href:"https://salsa.debian.org/nginx-team/nginx",target:"_blank",rel:"noopener noreferrer"}},[e._v("official debian packaging scripts"),a("OutboundLink")],1),e._v(" while pulling the latest mainline branch from "),a("a",{attrs:{href:"http://nginx.org/en/download.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Nginx official"),a("OutboundLink")],1),e._v(". You get the same experience as Debian / Ubuntu official nginx packages, except that you'll get the latest release.")]),e._v(" "),a("p",[e._v("We use docker script to create packages in a controlled Linux environment. We compile and maintain packages for each distribution we support to ensure ABI and API compatibility. We always pull the latest OpenSSL 1.1.1 releases before packaging to ensure known bug fixes are properly included.")]),e._v(" "),a("p",[e._v("In case of an emergency security issue or a critical bug, we may include a patch from an unreleased version into current version and release beforehand.")]),e._v(" "),a("h2",{attrs:{id:"current-version"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#current-version"}},[e._v("#")]),e._v(" Current Version")]),e._v(" "),a("p",[e._v("Nginx 1.19.6")]),e._v(" "),a("h2",{attrs:{id:"features"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#features"}},[e._v("#")]),e._v(" Features")]),e._v(" "),a("p",[e._v("Everything from Debian / Ubuntu official builds are included, with the following nginx modules being added to full and extras flavor:")]),e._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/google/ngx_brotli",target:"_blank",rel:"noopener noreferrer"}},[e._v("ngx_brotli"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/leev/ngx_http_geoip2_module",target:"_blank",rel:"noopener noreferrer"}},[e._v("ngx_http_geoip2_module"),a("OutboundLink")],1)]),e._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/vislee/ngx_http_ipdb_module",target:"_blank",rel:"noopener noreferrer"}},[e._v("ngx_http_ipdb_module"),a("OutboundLink")],1)])]),e._v(" "),a("p",[e._v("Statically built with OpenSSL 1.1.1i, so you can use TLS 1.3 even on distributions that don't have OpenSSL .")]),e._v(" "),a("p",[e._v("Version info:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("nginx version: nginx/1.19.6\nbuilt with OpenSSL 1.1.1i  8 Dec 2020\nTLS SNI support enabled\nconfigure arguments: --with-cc-opt='-g -O2 -fdebug-prefix-map=/build/nginx=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-z,relro -Wl,-z,now -fPIC' --with-openssl=/build/nginx/../openssl --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-compat --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_flv_module --with-http_geoip_module=dynamic --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_mp4_module --with-http_perl_module=dynamic --with-http_random_index_module --with-http_secure_link_module --with-http_sub_module --with-http_xslt_module=dynamic --with-mail=dynamic --with-mail_ssl_module --with-stream=dynamic --with-stream_geoip_module=dynamic --with-stream_ssl_module --with-stream_ssl_preread_module --add-module=/build/nginx/sb-modules/ngx_brotli --add-dynamic-module=/build/nginx/debian/modules/http-headers-more-filter --add-dynamic-module=/build/nginx/debian/modules/http-auth-pam --add-dynamic-module=/build/nginx/debian/modules/http-cache-purge --add-dynamic-module=/build/nginx/debian/modules/http-dav-ext --add-dynamic-module=/build/nginx/debian/modules/http-ndk --add-dynamic-module=/build/nginx/debian/modules/http-echo --add-dynamic-module=/build/nginx/debian/modules/http-fancyindex --add-dynamic-module=/build/nginx/debian/modules/http-geoip2 --add-dynamic-module=/build/nginx/sb-modules/ngx_http_ipdb_module --add-dynamic-module=/build/nginx/debian/modules/nchan --add-dynamic-module=/build/nginx/debian/modules/http-lua --add-dynamic-module=/build/nginx/debian/modules/rtmp --add-dynamic-module=/build/nginx/debian/modules/http-uploadprogress --add-dynamic-module=/build/nginx/debian/modules/http-upstream-fair --add-dynamic-module=/build/nginx/debian/modules/http-subs-filter\n")])])]),a("h2",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/install.html"}},[e._v("Install now or get docker image.")])],1),e._v(" "),a("h2",{attrs:{id:"mirrors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mirrors"}},[e._v("#")]),e._v(" Mirrors")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/mirrors.html"}},[e._v("View mirrors")])],1),e._v(" "),a("h2",{attrs:{id:"license"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#license"}},[e._v("#")]),e._v(" License")]),e._v(" "),a("p",[e._v("Nginx.io is distributed under the 2-clause BSD-like license.")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/changelog.html"}},[e._v("View changelogs")])],1)])}),[],!1,null,null,null);t.default=n.exports}}]);
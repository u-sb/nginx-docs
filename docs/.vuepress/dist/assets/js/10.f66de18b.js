(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{372:function(t,s,a){"use strict";a.r(s);var n=a(25),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),a("h2",{attrs:{id:"fully-supported-os"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fully-supported-os"}},[t._v("#")]),t._v(" Fully Supported OS")]),t._v(" "),a("ul",[a("li",[t._v("(LTS) Debian 9 Stretch")]),t._v(" "),a("li",[t._v("(LTS) Debian 10 Buster")]),t._v(" "),a("li",[t._v("(LTS) Debian 11 Bullseye")]),t._v(" "),a("li",[t._v("(LTS) Ubuntu 18.04 Bionic")]),t._v(" "),a("li",[t._v("(LTS) Ubuntu 20.04 Focal")])]),t._v(" "),a("h2",{attrs:{id:"install-via-deb"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-via-deb"}},[t._v("#")]),t._v(" Install via DEB")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" apt-transport-https lsb-release ca-certificates "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" gnupg -y\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://mirror-cdn.xtom.com/sb/nginx/public.key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" apt-key "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"deb https://mirror-cdn.xtom.com/sb/nginx/ '),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("lsb_release -sc"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v(' main"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" /etc/apt/sources.list.d/sb-nginx.list\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" update\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" nginx-extras -y\n")])])]),a("h2",{attrs:{id:"install-from-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-from-docker"}},[t._v("#")]),t._v(" Install from Docker")]),t._v(" "),a("p",[t._v("Check "),a("a",{attrs:{href:"https://github.com/brentybh/docker-sb-nginx",target:"_blank",rel:"noopener noreferrer"}},[t._v("Docker image for sb-nginx"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"non-supported-os"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#non-supported-os"}},[t._v("#")]),t._v(" Non-Supported OS")]),t._v(" "),a("ul",[a("li",[t._v("Debian 8 Jessie")]),t._v(" "),a("li",[t._v("Ubuntu 14.04 Trusty")]),t._v(" "),a("li",[t._v("Ubuntu 16.04 Xenial")]),t._v(" "),a("li",[t._v("Ubuntu 19.10 Eoan")])]),t._v(" "),a("p",[t._v("We do not provide full and long term support for legacy OS, but you can use it at your own risk. Non-supported OS will not always get the latest update and is on a best efforts basis.")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" apt-transport-https lsb-release ca-certificates "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" gnupg -y\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://mirror-cdn.xtom.com/sb/nginx/public-rsa.key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" apt-key "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("curl")]),t._v(" https://mirror-cdn.xtom.com/sb/nginx/public.key "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" apt-key "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("echo")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"deb https://mirror-cdn.xtom.com/sb/nginx/ '),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("lsb_release -sc"),a("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v(' main"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v(" /etc/apt/sources.list.d/sb-nginx.list\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" update\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" nginx-extras -y\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);
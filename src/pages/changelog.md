---
title: Changelog
---

# Changelog

## June 13, 2024

- Upgrade Nginx to 1.27.0 and OpenSSL to 3.3.1

## Mar 16, 2024

- Upgrade Nginx to 1.25.4 and OpenSSL to 3.2.1

## Dec 10, 2023

- Upgrade Nginx to 1.25.3 and OpenSSL to 3.2.0

## Aug 18, 2023

- Upgrade Nginx to 1.25.2

## Aug 4, 2023

- Upgrade OpenSSL to 3.1.2

## Jul 31, 2023

- Upgrade Nginx to 1.25.1
- Feature: the `http2` directive, which enables HTTP/2 on a per-server basis; the `http2` parameter of the `listen` directive is now deprecated. If you previously used `listen ... http2`, you should now use `http2 on` instead, or you will see the following warning during configuration testing: `nginx: [warn] the "listen ... http2" directive is deprecated, use the "http2" directive instead`.

## Jun 5, 2023

- Upgrade Nginx to 1.25.0
- HTTP/3: removed `http3` parameter of `listen` directive, use `quic` instead.
- The `ngx_http_quic_module` is merged to `ngx_http_v3_module`.

## May 1, 2023

- Upgrade Nginx to 1.23.4
- Add Nginx Quic

## Dec 19, 2022

- Upgrade Nginx to 1.23.3

## Oct 19, 2022

- Upgrade Nginx to 1.23.2
- Upgrade OpenSSL to 3.0.7
- Added Ubuntu 22.10 Kinetic
- Removed Debian 9 Stretch

## Aug 19, 2022

- Upgrade Nginx to 1.23.1
- Upgrade OpenSSL to 1.1.1q / 3.0.5
- Announce end of update for Jessie, Xenial, Hirsute and Impish

## Jul 3, 2022

- Upgrade Nginx to 1.23.0
- Upgrade OpenSSL to 3.0.4
- Removed cdnweb mirror in India
- Add xTom mirror in Australia

## May 27, 2022

- Domain `nginx.io` was [disputed](https://www.wipo.int/amc/en/domains/search/case.jsp?case_id=57148) and [transferred](https://u.sb/nginx-io/) to F5 who acquired Nginx in 2019. We [forked](https://github.com/u-sb/nginx-source) the project `nginx` and are now maintaining it under name `n.wtf`.

## Mar 14, 2022

- Change domain and project name to `n.wtf`

## Feb 27, 2022

- Change domain and project name to `nginx.u.sb` and `nginx by u.sb`
- Add cdnweb mirror in India

## Feb 16, 2022

- Upgrade Nginx to 1.21.6

## Jan 21, 2022

- Add TUNA, BFSU, NJU mirrors in China Mainland

## Jan 17, 2022

- Upgrade Nginx to 1.21.5
- Upgrade OpenSSL to 3.0.1

## Nov 9, 2021

- Upgrade Nginx to 1.21.4

## September 15, 2021

- Upgrade Nginx to 1.21.3
- Upgrade OpenSSL to 3.0.0

## August 31, 2021

- Upgrade Nginx to 1.21.2
- Upgrade OpenSSL to 1.1.1l

## July 17, 2021

- Upgrade Nginx to 1.21.1

## May 27, 2021

- Upgrade Nginx to 1.21.0
- Add mirrors in Germany and Estonia

## April 20, 2021

- Upgrade Nginx to 1.19.10

## Mar 31, 2021

- Upgrade Nginx to 1.19.9

## Mar 25, 2021

- Upgrade OpenSSL to 1.1.1k

## Mar 20, 2021

- Upgrade Nginx to 1.19.8

## Mar 1, 2021

- Upgrade Nginx to 1.19.7
- Upgrade OpenSSL to 1.1.1j

## Dec 25, 2020

- Upgrade Nginx to 1.19.6

## Dec 10, 2020

- Upgrade OpenSSL to 1.1.1i

## Dec 1, 2020

- Upgrade Nginx to 1.19.5

## Nov 15, 2020

- Upgrade Nginx to 1.19.4

## Oct 18, 2020

- Upgrade Nginx to 1.19.3
- Upgrade OpenSSL to 1.1.1h

## Sep 1, 2020

- Upgrade Nginx to 1.19.2

## June 30, 2020

- Upgrade Nginx to 1.19.1

## June 1, 2020

- Upgrade Nginx to 1.19.0

## April 23, 2020

- Upgrade Nginx to 1.17.10
- Upgrade OpenSSL to 1.1.1g


## Mar 8, 2020

- Upgrade Nginx to 1.17.9

## Feb 1, 2020

- Upgrade Nginx to 1.17.8
- Add `ngx_http_ipdb_module`
- Upgrade `ngx_http_geoip2_module`

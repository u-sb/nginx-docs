# Installation

## Fully Supported OS

* (LTS) Debian 9 Stretch
* (LTS) Debian 10 Buster
* (LTS) Debian 11 Bullseye
* (LTS) Ubuntu 18.04 Bionic
* (LTS) Ubuntu 20.04 Focal

## Install via DEB

```bash
apt install apt-transport-https lsb-release ca-certificates curl gnupg -y
curl https://mirror-cdn.xtom.com/sb/nginx/public.key | apt-key add -
echo "deb https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/sb-nginx.list
apt update
apt install nginx-extras -y
```

## Install from Docker

Check [Docker image for sb-nginx](https://github.com/brentybh/docker-sb-nginx)

## Non-Supported OS

* Debian 8 Jessie
* Ubuntu 14.04 Trusty
* Ubuntu 16.04 Xenial
* Ubuntu 19.10 Eoan

We do not provide full and long term support for legacy OS, but you can use it at your own risk. Non-supported OS will not always get the latest update and is on a best efforts basis.

```bash
apt install apt-transport-https lsb-release ca-certificates curl gnupg -y
curl https://mirror-cdn.xtom.com/sb/nginx/public-rsa.key | apt-key add -
curl https://mirror-cdn.xtom.com/sb/nginx/public.key | apt-key add -
echo "deb https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/sb-nginx.list
apt update
apt install nginx-extras -y
```

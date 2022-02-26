# Installation

## Fully Supported OS

* Debian 10 Buster (OldStable)
* Debian 11 Bullseye (Stable)
* Debian 12 Bookworm (Testing)
* Ubuntu 18.04 Bionic (LTS)
* Ubuntu 20.04 Focal (LTS)
* Ubuntu 21.10 Impish

We support LTS and current releases of Debian and Ubuntu, as well as releases that are going to be GA soon. Running on an ARM64 platform is currently an experimental feature, but we plan to keep supporting it in the long term.

## Install via DEB

``` sh
apt install -y lsb-release ca-certificates wget gnupg
wget -O /usr/share/keyrings/nginx.u.sb.asc https://nginx.u.sb/public.key
echo "deb [signed-by=/usr/share/keyrings/nginx.u.sb.asc] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/nginx.u.sb.list
apt update
apt install -y nginx-extras
```

## Install from Docker

Check out [Docker image for nginx-docker](https://github.com/u-sb/nginx-docker).

## Unsupported OS

* Debian 8 Jessie [amd64 only]
* Debian 9 Stretch [amd64 only]
* Ubuntu 16.04 Xenial [amd64 only]
* Ubuntu 21.04 Hirsute

We do not provide full and long term support for legacy OS, but you can use it at your own risk. Unsupported OS will not always get the latest update and is on a best efforts basis.

``` sh
apt install -y apt-transport-https lsb-release ca-certificates curl gnupg
curl https://u.sb/nginx-rsa.key | apt-key add -
curl https://u.sb/nginx.key | apt-key add -
echo "deb https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/nginx.u.sb.list
apt update
apt install -y nginx-extras
```

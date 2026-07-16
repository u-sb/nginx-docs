# N.WTF

Open-source nginx Debian / Ubuntu repository with latest mainline builds.

This repository contains the [n.wtf](https://n.wtf/) website and documentation. The nginx packaging sources live at [u-sb/nginx-source](https://github.com/u-sb/nginx-source).

## Features

- **Up-to-date**: Latest nginx mainline branch
- **TLS 1.3 & HTTP/3**: Statically built with the latest OpenSSL
- **Extra Modules**: Brotli, Zstd, GeoIP2, IPDB, ACME, and more

## Quick Install

### Debian (via extrepo)

```bash
sudo apt update && sudo apt install extrepo -y
sudo extrepo enable n.wtf
sudo apt update && sudo apt install nginx-extras -y
```

### Debian / Ubuntu

One-Line Style:

```bash
sudo apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg
curl -sSL https://n.wtf/public.key | sudo bash -c 'gpg --dearmor > /usr/share/keyrings/n.wtf.gpg'
sudo bash -c 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/n.wtf.gpg] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/n.wtf.list'
sudo apt update
sudo apt install nginx-extras -y
```

DEB822:

```bash
sudo apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg
curl -sSL https://n.wtf/public.key | sudo bash -c 'gpg --dearmor > /usr/share/keyrings/n.wtf.gpg'
sudo bash -c 'cat > /etc/apt/sources.list.d/n.wtf.sources << EOF
Components: main
Architectures: $(dpkg --print-architecture)
Suites: $(lsb_release -cs)
Types: deb
Uris: https://mirror-cdn.xtom.com/sb/nginx/
Signed-By: /usr/share/keyrings/n.wtf.gpg
EOF'
sudo apt update
sudo apt install nginx-extras -y
```

### Docker

```bash
docker run --name nginx --net host --restart always \
  -v $HOME/nginx-config:/usr/src/docker-nginx/conf:ro \
  -d ghcr.io/u-sb/nginx
```

See [nginx-docker](https://github.com/u-sb/nginx-docker) for Docker Compose setup.

## Supported OS

| Distribution | Versions |
|--------------|----------|
| Debian | 12 (Bookworm), 13 (Trixie), 14 (Forky) |
| Ubuntu | 22.04 (Jammy), 24.04 (Noble), 26.04 (Resolute) |

## Included Modules

- [ngx_brotli](https://github.com/google/ngx_brotli)
- [zstd-nginx-module](https://github.com/tokers/zstd-nginx-module)
- [ngx_http_geoip2_module](https://github.com/leev/ngx_http_geoip2_module)
- [ngx_http_ipdb_module](https://github.com/vislee/ngx_http_ipdb_module)
- [nginx-acme](https://github.com/nginx/nginx-acme)
- [QUIC / HTTP3](https://nginx.org/en/docs/quic.html)

## Documentation

Visit [n.wtf](https://n.wtf/) for full documentation.

## License

MIT License

NGINX is a trademark of [F5, Inc.](https://www.f5.com/) This project is not affiliated with NGINX Inc. or F5.

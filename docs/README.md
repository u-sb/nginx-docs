---
home: true
title: Home
heroImage: /apple-touch-icon.png
heroText: N.WTF
tagline: Open-source nginx Debian / Ubuntu repository
actions:
  - text: Getting Started
    link: /guide.html
    type: primary
  - text: Install
    link: /install.html
    type: secondary
features:
- title: Up-to-date
  details: We release latest mainline branch from nginx official source code.
- title: TLS 1.3
  details: We packed OpenSSL 3.0.x into our nginx as standard.
- title: Modules
  details: Brotli compression and GeoIP2.
footer: MIT Licensed | Copyright © 2019 - 2022 SB Blog
---

### As Easy as 1, 2, 3

<CodeGroup>
  <CodeGroupItem title="Debian / Ubuntu" active>

```bash:no-line-numbers
# Install required software
apt install wget gnupg apt-transport-https lsb-release ca-certificates -y

# Download PGP Key
wget -O /usr/share/keyrings/n.wtf.asc https://n.wtf/public.key

# Add repo
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/n.wtf.asc] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/n.wtf.list

# Update system
apt update

# Install Latest Nginx
apt install nginx-extras -y
```

  </CodeGroupItem>

  <CodeGroupItem title="Docker">
  
```bash:no-line-numbers
docker run --name nginx --net host --restart always -v $HOME/nginx-config:/usr/src/docker-nginx/conf:ro -d ghcr.io/u-sb/nginx
```

  </CodeGroupItem>

  <CodeGroupItem title="Docker Compose">
  
```bash:no-line-numbers
# Clone our repo
git clone https://github.com/u-sb/nginx-docker

# Change directory to nginx-docker folder
cd nginx-docker

# Run docker-compose
docker-compose pull
docker-compose up -d
```

  </CodeGroupItem>
</CodeGroup>

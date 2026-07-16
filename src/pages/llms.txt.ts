import type {APIRoute} from 'astro';
import {getBlogPosts} from '@/lib/posts';
import website_config, {versions} from '@/lib/website_config';
import {changelog} from '@/data/changelog';
import {moduleDetails} from '@/data/module-details';

function isoDate(d: Date | string): string {
    return new Date(d).toISOString().slice(0, 10);
}

export const GET: APIRoute = async () => {
    const {baseUrl, title, description, author} = website_config;
    const posts = await getBlogPosts();

    const lines: string[] = [];
    lines.push(`# ${title}`);
    lines.push('');
    lines.push(`> ${description.trim()} TLS 1.3 and HTTP/3 via statically linked OpenSSL, plus ${moduleDetails.length} third-party modules (Brotli, Zstandard, GeoIP2, ACME, Lua, and more). Free to use; packages are signed and served from mirrors worldwide.`);
    lines.push('');
    lines.push(`Author: ${author.name} (${author.link})`);
    lines.push(`Site: ${baseUrl}`);
    lines.push(`Current versions: nginx ${versions.nginx} (mainline), OpenSSL ${versions.openssl}`);
    lines.push(`Supported OS: Debian 12 Bookworm, Debian 13 Trixie, Debian 14 Forky (experimental); Ubuntu 22.04 Jammy, 24.04 Noble, 25.10 Questing, 26.04 Resolute; Docker (amd64/arm64)`);
    lines.push('');

    lines.push('## Install');
    lines.push('');
    lines.push('Via extrepo (Debian only):');
    lines.push('');
    lines.push('```bash');
    lines.push('sudo apt update && sudo apt install extrepo -y');
    lines.push('sudo extrepo enable n.wtf');
    lines.push('sudo apt update && sudo apt install nginx-extras -y');
    lines.push('```');
    lines.push('');
    lines.push('Via apt source (Debian and Ubuntu):');
    lines.push('');
    lines.push('```bash');
    lines.push('sudo apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg');
    lines.push("curl -sSL https://n.wtf/public.key | sudo bash -c 'gpg --dearmor > /usr/share/keyrings/n.wtf.gpg'");
    lines.push('sudo bash -c \'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/n.wtf.gpg] https://mirror-cdn.xtom.com/sb/nginx/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/n.wtf.list\'');
    lines.push('sudo apt update');
    lines.push('sudo apt install nginx-extras -y');
    lines.push('```');
    lines.push('');
    lines.push(`Docker image: ghcr.io/u-sb/nginx (compose setup: https://github.com/u-sb/nginx-docker). Full instructions incl. DEB822 format: ${baseUrl}/install/`);
    lines.push('');

    lines.push('## Pages');
    lines.push('');
    for (const item of website_config.navbar) {
        lines.push(`- [${item.title}](${baseUrl}${item.path})`);
    }
    lines.push(`- [Mirror list (15 mirrors worldwide incl. China Mainland)](${baseUrl}/mirrors/)`);
    lines.push('');

    lines.push('## Modules');
    lines.push('');
    lines.push(`All ${moduleDetails.length} bundled third-party modules, each with directives, an nginx.conf example, and its upstream license:`);
    lines.push('');
    for (const m of moduleDetails) {
        lines.push(`- [${m.name}](${baseUrl}/modules/${m.slug}/): ${m.desc} (${m.kind}, ${m.license})`);
    }
    lines.push('');

    lines.push('## Blog Posts');
    lines.push('');
    for (const post of posts) {
        lines.push(`- [${post.data.title}](${baseUrl}/blog/${post.id}/) (${isoDate(post.data.date)}): ${post.data.excerpt}`);
    }
    lines.push('');

    lines.push('## Recent Releases');
    lines.push('');
    for (const entry of changelog.slice(0, 10)) {
        lines.push(`- ${entry.date}: ${entry.items.join('; ')}`);
    }
    lines.push('');
    lines.push(`Full changelog: ${baseUrl}/changelog/`);
    lines.push('');

    return new Response(lines.join('\n'), {
        headers: {'Content-Type': 'text/plain; charset=utf-8'},
    });
};

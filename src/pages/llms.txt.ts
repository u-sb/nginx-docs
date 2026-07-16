import type {APIRoute} from 'astro';
import {getBlogPosts} from '@/lib/posts';
import website_config, {versions} from '@/lib/website_config';
import {changelog} from '@/data/changelog';

function isoDate(d: Date | string): string {
    return new Date(d).toISOString().slice(0, 10);
}

export const GET: APIRoute = async () => {
    const {baseUrl, title, description, author} = website_config;
    const posts = await getBlogPosts();

    const lines: string[] = [];
    lines.push(`# ${title}`);
    lines.push('');
    lines.push(`> ${description.trim()}`);
    lines.push('');
    lines.push(`Author: ${author.name} (${author.link})`);
    lines.push(`Site: ${baseUrl}`);
    lines.push(`Current versions: nginx ${versions.nginx}, OpenSSL ${versions.openssl}`);
    lines.push('');

    lines.push('## Pages');
    lines.push('');
    for (const item of website_config.navbar) {
        lines.push(`- [${item.title}](${baseUrl}${item.path})`);
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

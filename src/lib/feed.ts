import {Marked} from 'marked';
import {Feed} from 'feed';
import {getCollection, type CollectionEntry} from 'astro:content';
import website_config from '@/lib/website_config';

const marked = new Marked({gfm: true, breaks: false, async: false});

/** Render markdown body to HTML (shared by rss.xml / atom.xml). */
export function markdownToHtml(content: string): string {
    if (!content) return '';
    return marked.parse(content) as string;
}

/** Rewrite site-relative href/src attributes to absolute URLs (shared by rss.xml / atom.xml). */
export function absolutizeUrls(html: string, baseUrl: string): string {
    return html.replace(
        /(\s(?:href|src)=")(\/(?!\/)[^"]*)(")/g,
        (_m, p1, p2, p3) => `${p1}${baseUrl}${p2}${p3}`,
    );
}

/** Blog posts sorted newest-first, capped for feeds. Returns [] when the collection is empty. */
export async function getFeedPosts(limit = 20): Promise<CollectionEntry<'blog'>[]> {
    const posts = await getCollection('blog');
    return [...posts]
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
        .slice(0, limit);
}

export async function buildFeed(): Promise<Feed> {
    const currentYear = new Date().getFullYear();
    const posts = await getFeedPosts();
    const {baseUrl, title, description, author} = website_config;

    const feed = new Feed({
        title,
        description,
        id: `${baseUrl}/`,
        link: `${baseUrl}/`,
        language: 'en',
        feedLinks: {
            rss: `${baseUrl}/rss.xml`,
            atom: `${baseUrl}/atom.xml`,
        },
        author,
        copyright: `© ${currentYear} ${title}`,
    });

    // Entries sharing the same updated timestamp get millisecond offsets to keep document order.
    const dateCounts = new Map<number, number>();
    posts.forEach((p) => {
        const k = (p.data.updated ?? p.data.date).getTime();
        dateCounts.set(k, (dateCounts.get(k) ?? 0) + 1);
    });
    const dateSeen = new Map<number, number>();

    for (const entry of posts) {
        const {title: postTitle, excerpt, date, updated} = entry.data;
        const baseTs = (updated ?? date).getTime();
        const total = dateCounts.get(baseTs) ?? 1;
        const idx = dateSeen.get(baseTs) ?? 0;
        const itemDate = new Date(baseTs + (total - 1 - idx));
        dateSeen.set(baseTs, idx + 1);

        const url = `${baseUrl}/blog/${entry.id}/`;
        const bodyHtml = absolutizeUrls(markdownToHtml(entry.body || ''), baseUrl);

        feed.addItem({
            title: postTitle,
            id: url,
            link: url,
            description: excerpt,
            content: bodyHtml,
            author: [author],
            date: itemDate,
            published: date,
        });
    }

    return feed;
}

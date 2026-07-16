import {getCollection, type CollectionEntry} from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Normalize a tag into its URL slug. */
export function tagSlug(tag: string): string {
    return tag.toLowerCase().replace(/[\s./]+/g, '-');
}

function dateValue(date: Date): number {
    const t = date.getTime();
    return Number.isNaN(t) ? -Infinity : t;
}

/** Blog posts, newest first (entries without a valid date sink to the bottom). */
export async function getBlogPosts(): Promise<BlogPost[]> {
    const posts = await getCollection('blog');
    return posts.sort((a, b) => dateValue(b.data.date) - dateValue(a.data.date));
}

/** All blog posts that carry a tag normalizing to `slug`. */
export async function getPostsByTag(slug: string): Promise<BlogPost[]> {
    const posts = await getBlogPosts();
    return posts.filter((post) => post.data.tags.some((tag) => tagSlug(tag) === slug));
}

/** The original (un-normalized) tag name for a given slug, taken from the posts. */
export function originTagName(posts: BlogPost[], slug: string): string {
    for (const post of posts) {
        const found = post.data.tags.find((tag) => tagSlug(tag) === slug);
        if (found) return found;
    }
    return slug;
}

/** Format a stored date as YYYY-MM-DD for display. */
export function formatDate(date: Date): string {
    if (Number.isNaN(date.getTime())) return 'Unknown Date';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

import rss from '@astrojs/rss';
import type {APIRoute} from 'astro';
import website_config from '@/lib/website_config';
import {getFeedPosts, markdownToHtml, absolutizeUrls} from '@/lib/feed';

export const GET: APIRoute = async (context) => {
    const currentYear = new Date().getFullYear();
    const posts = await getFeedPosts();
    const {baseUrl, title, description} = website_config;

    return rss({
        title,
        description,
        site: context.site ?? baseUrl,
        customData: `<language>en</language><copyright>© ${currentYear} ${title}</copyright>`,
        items: posts.map((entry) => {
            const {title: postTitle, excerpt, date} = entry.data;
            const url = `${baseUrl}/blog/${entry.id}/`;
            const bodyHtml = absolutizeUrls(markdownToHtml(entry.body || ''), baseUrl);

            return {
                title: postTitle,
                link: url,
                description: excerpt,
                pubDate: date,
                content: bodyHtml,
            };
        }),
    });
};

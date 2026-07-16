import type {APIRoute} from 'astro';
import website_config from '@/lib/website_config';

export const GET: APIRoute = () => {
    const body = `User-agent: *
Allow: /

Sitemap: ${website_config.baseUrl}/sitemap-index.xml
`;
    return new Response(body, {
        headers: {'Content-Type': 'text/plain; charset=utf-8'},
    });
};

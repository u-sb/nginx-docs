import {defineCollection} from 'astro:content';
import {z} from 'astro:schema';
import {glob} from 'astro/loaders';

const blog = defineCollection({
    loader: glob({pattern: '*.mdx', base: './blog'}),
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        updated: z.coerce.date().optional(),
    }),
});

export const collections = {blog};

// Dependency-free slugify for English headings.
export const customSlugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/\./g, '-')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

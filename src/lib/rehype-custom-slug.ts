import {visit} from 'unist-util-visit';
import type {Element, Node, Text, ElementContent} from 'hast';
import {customSlugify} from './slugify';

interface RehypeCustomSlugOptions {
    prefix?: string;
}

// Extract all text content of an element (including nested elements).
function extractText(node: ElementContent | Element): string {
    if (node.type === 'text') {
        return (node as Text).value;
    }
    if (node.type === 'element') {
        const element = node as Element;
        return (element.children || [])
            .map(child => extractText(child as ElementContent))
            .join('');
    }
    return '';
}

export default function rehypeCustomSlug(options: RehypeCustomSlugOptions = {}): (tree: Node) => void {
    const prefix = options.prefix || '';

    return (tree: Node) => {
        // Reset per document so heading id dedupe never depends on build order.
        const usedIds = new Set<string>();
        visit(tree, 'element', (node: Element) => {
            if (node.tagName && /^h[1-6]$/.test(node.tagName) && !node.properties.id) {
                const text = extractText(node);
                const cleanText = text.trim();

                if (!cleanText) {
                    return;
                }

                const slug = customSlugify(cleanText);
                let finalId = prefix + slug;

                let counter = 1;
                while (usedIds.has(finalId)) {
                    finalId = prefix + slug + '-' + counter;
                    counter++;
                }

                usedIds.add(finalId);
                node.properties.id = finalId;
            }
        });
    };
}

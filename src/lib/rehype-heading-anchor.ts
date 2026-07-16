import {visit} from 'unist-util-visit';
import type {Element, Node} from 'hast';

// Heading prefix anchors: h1/h2 get #, h3 gets ##, h4 gets ###, and so on.
export default function rehypeHeadingAnchor(): (tree: Node) => void {
    return (tree: Node) => {
        visit(tree, 'element', (node: Element) => {
            const match = /^h([1-6])$/.exec(node.tagName);
            if (!match) return;
            const id = node.properties?.id;
            if (!id) return;
            const level = Number(match[1]);
            const hashes = '#'.repeat(Math.max(1, level - 1));
            const anchor: Element = {
                type: 'element',
                tagName: 'a',
                properties: {
                    href: `#${id}`,
                    className: ['heading-anchor'],
                    ariaLabel: 'Permalink',
                },
                children: [{type: 'text', value: hashes}],
            };
            node.children.unshift(anchor);
        });
    };
}

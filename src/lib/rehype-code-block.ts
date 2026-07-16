import {visit} from 'unist-util-visit';
import type {Element, Node, Parent} from 'hast';

// Pull the language name out of <pre><code class="hljs language-xxx"> for the header label.
function codeLanguage(pre: Element): string {
    const code = pre.children.find(
        (c): c is Element => c.type === 'element' && c.tagName === 'code',
    );
    const classes = (code?.properties?.className as string[] | undefined) ?? [];
    for (const cls of classes) {
        const m = /^language-(.+)$/.exec(String(cls));
        if (m) return m[1].toLowerCase();
    }
    return 'text';
}

// Optional filename from the fence meta (```bash title="install.sh" / ```bash install.sh).
function codeLabel(pre: Element): string | undefined {
    const code = pre.children.find(
        (c): c is Element => c.type === 'element' && c.tagName === 'code',
    );
    const meta = (code?.data as {meta?: string} | undefined)?.meta;
    if (!meta) return undefined;
    const titled = /(?:title|filename)=["']?([^"'\s]+)["']?/.exec(meta);
    if (titled) return titled[1];
    const first = meta.trim().split(/\s+/)[0];
    return first || undefined;
}

// Wrap each <pre> in a terminal card: header bar (filename/lang label + copy button) + code pane.
export default function rehypeCodeBlock(): (tree: Node) => void {
    return (tree: Node) => {
        visit(tree, 'element', (node: Element, index, parent) => {
            if (node.tagName !== 'pre' || !parent || typeof index !== 'number') return;
            const p = parent as Parent;
            // Skip if already wrapped.
            if ((p as Element).properties?.dataCodeBlock !== undefined) return;

            const label = codeLabel(node) ?? codeLanguage(node);

            const pre: Element = {
                ...node,
                properties: {
                    ...node.properties,
                    className: ['relative'],
                },
            };
            const header: Element = {
                type: 'element',
                tagName: 'div',
                properties: {className: ['code-window-bar'], dataCodeHeader: ''},
                children: [
                    {
                        type: 'element',
                        tagName: 'span',
                        properties: {className: ['code-lang']},
                        children: [{type: 'text', value: label}],
                    },
                    {
                        type: 'element',
                        tagName: 'button',
                        properties: {className: ['code-copy-btn'], dataCopyBtn: '', type: 'button'},
                        children: [{type: 'text', value: 'copy'}],
                    },
                ],
            };
            const wrapper: Element = {
                type: 'element',
                tagName: 'div',
                properties: {
                    className: ['code-block'],
                    dataCodeBlock: '',
                },
                children: [header, pre],
            };
            p.children[index] = wrapper;
        });
    };
}

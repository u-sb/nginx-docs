// Per-module detail data for the /modules/ pages.
export interface ModuleDetail {
    slug: string;
    name: string; // display name, matches the module grids
    desc: string; // one-liner used on cards and as the page lede
    kind: 'static' | 'dynamic'; // --add-module vs --add-dynamic-module in our build
    package?: string; // Debian package that ships the .so (dynamic modules only)
    repo: string; // upstream source repository
    docs?: string; // official docs URL when it is not the repo README
    license: string; // upstream license, e.g. 'BSD-2-Clause'
    overview: string[]; // 2-3 short factual paragraphs
    highlights: {name: string; desc: string}[]; // key directives / features (4-6)
    example: string; // minimal nginx.conf snippet
}

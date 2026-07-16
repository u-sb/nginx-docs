import type {ModuleDetail} from './types';
import {groupA} from './group-a';
import {groupB} from './group-b';
import {groupC} from './group-c';
import {groupD} from './group-d';

export type {ModuleDetail} from './types';

// Alphabetical by display name — the site-wide ordering for module lists.
export const moduleDetails: ModuleDetail[] = [...groupA, ...groupB, ...groupC, ...groupD]
    .sort((a, b) => a.name.localeCompare(b.name));

export function getModule(slug: string): ModuleDetail | undefined {
    return moduleDetails.find((m) => m.slug === slug);
}

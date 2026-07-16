// Card data for the homepage / features module grids — derived from the
// per-module detail pages so the lists never drift apart. Alphabetical.
import {moduleDetails} from './module-details';

export const modules = moduleDetails.map(({slug, name, desc}) => ({slug, name, desc}));

import { converge, merge, dissoc, prop } from 'ramda';

export const spread = converge(merge, [dissoc, prop]);
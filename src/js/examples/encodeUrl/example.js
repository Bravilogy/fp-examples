import {
    __,
    map,
    when,
    join,
    concat,
    useWith,
    toPairs,
    compose,
    contains,
    complement,
} from 'ramda';

const formatParameter = ([key, value]) => `${key}=${encodeURIComponent(value)}`;

const encodeParams = compose(join('&'), map(formatParameter), toPairs);

export const encodeUrl = useWith(concat, [
    when(complement(contains('?')), concat(__, '?')),
    encodeParams
]);

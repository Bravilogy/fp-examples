import {
    __,
    when,
    pipe,
    join,
    flip,
    concat,
    values,
    useWith,
    contains,
    complement,
    mapObjIndexed,
} from 'ramda';

const formatParameter = (key, value) => `${key}=${encodeURIComponent(value)}`;

const encodeParams = pipe(
    mapObjIndexed(flip(formatParameter)),
    values,
    join('&')
);

export const encodeUrl = useWith(concat, [
    when(complement(contains('?')), concat(__, '?')),
    encodeParams
]);

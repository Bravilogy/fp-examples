import { curry, compose, reduce, or, props } from 'ramda';

export const firstProp = curry(compose(reduce(or, null), props));

import { uncurryN, pipe, props, juxt, compose, join, dropLast, takeLast } from 'ramda';

export const joinAddressProps = uncurryN(3, n => pipe(
    props,
    juxt([compose(join(', '), dropLast(n)),
        compose(join(' '), takeLast(n))]),
    join(' ')
));


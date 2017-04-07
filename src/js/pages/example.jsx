import React from 'react';
import examples from 'examples/index';
import { uncurryN, pipe, find, propEq, prop } from 'ramda';

const getExampleComponent = pipe(
    uncurryN(2, id => find(propEq('path', id))),
    prop('component')
);

export default props => {
    const ExampleComponent = getExampleComponent(
        props.params.id, examples
    );

    return <ExampleComponent />;
};

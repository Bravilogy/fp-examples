/* Get specific address elements from address object,
 * join first n elements with ' ', join last n
 * elements with ', ' and then join the two
 * groups together with ' ' again.
 */
import React from 'react';
import Highlight from 'react-highlight';
import Problem from 'pages/components/problem';
import Solution from 'pages/components/solution';
import { Tags } from 'pages/components/ramda-helpers';

export default React.createClass({
    displayName: 'JoinAddressProps',
    render() {
        return (
            <div className='content'>
                <Problem>
                    We need to get specific elements from an address object. Then we need to join the last 2 elements
                    with an <strong>empty space</strong>, join the rest with <strong>comma</strong>. And finally join the two
                    groups together with an <strong>empty space</strong> again.
                </Problem>
                <Solution solutionLink='https://goo.gl/IuGOe0'>
                    <p>
                        Let's define the <strong>elements</strong> we're interested in:
                    </p>
                    <Highlight className='javascript'>
{`const elements = [
    'address_line_1',
    'address_line_2',
    'address_line_3',
    'city',
    'county',
    'postcode'
];`}
                    </Highlight>
                    <p>
                        And for the example's sake, our address object will look like this:
                    </p>
                    <Highlight className='javascript'>
{`const address = {
    address_line_1: 'aline1',
    address_line_2: 'aline2',
    address_line_3: 'aline3',
    city: 'London',
    county: 'Functional',
    postcode: 'FN1 33T'
};`}
                    </Highlight>
                    <p>
                        Magic:
                    </p>
                    <Highlight className='javascript'>
{`const joinAddressProps = pipe(
    props,
    juxt([compose(join(', '), dropLast(1)),
          compose(join(' '), takeLast(1))]),
    join(' ')
);
joinAddressProps(elements, address);
// => aline1, aline2, aline3, London, Functional FN1 33T`}
                    </Highlight>
                    <p>
                        {Tags(['pipe', 'props', 'juxt', 'compose', 'join', 'dropLast', 'takeLast'])}
                    </p>
                    <p>
                        Since we are using the same <strong>number value</strong> (dropLast(<strong>1</strong>), takeLast(<strong>1</strong>)), we can also make that hard-coded <strong>1</strong> dynamic:
                    </p>
                    <Highlight className='javascript'>
{`const joinAddressProps = uncurryN(3, n => pipe(
    props,
    juxt([compose(join(', '), dropLast(n)),
          compose(join(' '), takeLast(n))]),
    join(' ')
));
// Let's pass it during the call instead
joinAddressProps(1, elements, address);
// => aline1, aline2, aline3, London, Functional FN1 33T

joinAddressProps(2, elements, address);
// => aline1, aline2, aline3, London Functional FN1 33T`}
                    </Highlight>
                    <p>
                        {Tags(['uncurryN', 'pipe', 'props', 'juxt', 'compose', 'join', 'dropLast', 'takeLast'])}
                    </p>
                </Solution>
            </div>
        );
    }
});

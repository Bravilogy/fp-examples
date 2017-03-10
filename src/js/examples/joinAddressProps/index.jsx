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
                    We need to get specific address elements from address object. Then we need to join last 2 elements
                    with an <strong>empty space</strong>, join the rest elements with <strong>comma</strong>. And finally join the two
                    groups together with an <strong>empty space</strong> again.
                </Problem>
                <Solution solutionLink='https://goo.gl/PRBaJW'>
                    <p>
                        Let's define <strong>elements</strong> we want to fetch:
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
{`const getFormattedAddress = pipe(
    props,
    juxt([compose(join(', '), dropLast(1)),
          compose(join(' '), takeLast(1))]),
    join(' ')
);
getFormattedAddress(elements, address);
// => aline1, aline2, aline3, London, Functional FN1 33T`}
                    </Highlight>
                    <p>
                        {Tags(['pipe', 'props', 'juxt', 'compose', 'join', 'dropLast', 'takeLast'])}
                    </p>
                    <p>
                        Since we are using the same <strong>number value</strong>, we can also make that hard-coded <strong>1</strong> dynamic:
                    </p>
                    <Highlight className='javascript'>
{`const getFormattedAddress = uncurryN(2, n => pipe(
    props,
    juxt([compose(join(', '), dropLast(n)),
          compose(join(' '), takeLast(n))]),
    join(' ')
));
// Let's pass it during the call instead
getFormattedAddress(1, elements, address);
// => aline1, aline2, aline3, London, Functional FN1 33T

getFormattedAddress(2, elements, address);
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

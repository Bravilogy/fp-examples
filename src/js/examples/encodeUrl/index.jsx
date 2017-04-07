/* Simple function that will convert our url with params
 * into an encoded one, using encodeURIComponent.
 */
import React from 'react';
import Highlight from 'react-highlight';
import Problem from 'pages/components/problem';
import Solution from 'pages/components/solution';
import { Tags } from 'pages/components/ramda-helpers';

export default React.createClass({
    displayName: 'EncodeUrl',
    render() {
        return (
            <div className='content'>
                <Problem>
                    We have a <strong>url</strong> and an object of <strong>params</strong>.
                    We need to <strong>encode</strong> params and then concatenate everything together. Our function
                    will also add a <strong>?</strong> at the end of the url if it is not there already.
                </Problem>
                <Solution solutionLink='https://goo.gl/XLkq2l'>
                    <Highlight className='javascript'>
{"const formatParameter = ([key, value]) => `${key}=${encodeURIComponent(value)}`;\n\n"}
{`const encodeParams = compose(join('&'), map(formatParameter), toPairs);

const encodeUrl = useWith(concat, [
    when(complement(contains('?')), concat(__, '?')),
    encodeParams
]);

encodeUrl('http://example.com', {
    id: 1,
    topic: 'Javascript',
    chapter: 'Functional & Awesome'
});
// => http://example.com?id=1&topic=Javascript&chapter=Functional%20%26%20Awesome`}
                    </Highlight>
                    <p>
                        {Tags(['compose', 'join', 'map', 'toPairs', 'useWith', 'when', 'complement', 'contains', 'concat', '__'])}
                    </p>
                </Solution>
            </div>
        )
    }
});

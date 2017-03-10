/* Take a specific property from an object
 * and spread it. like butter.
 */
import React from 'react';
import Highlight from 'react-highlight';
import Problem from 'pages/components/problem';
import Solution from 'pages/components/solution';
import { Tags, Repl } from 'pages/components/ramda-helpers';

export default React.createClass({
    displayName: 'SpreadProperty',
    render() {
        return (
            <div className='content'>
                <Problem>
                    We have an object and we need to take one of its properties and <strong>{'{...spread}'}</strong> it.
                </Problem>
                <Solution solutionLink='https://goo.gl/R02w2X'>
                    <p>
                        So this is our object:
                    </p>
                    <Highlight className='javascript'>
{`const state = {
    home: {
        title: 'Home page',
        resources: [],
    },
    dispatch: function() {}
};`}
                    </Highlight>
                    <p>
                        and our result should be:
                    </p>
                    <Highlight className='javascript'>
{`{
    dispatch: function() {},
    title: 'Home page',
    resources: []
}`}
                    </Highlight>
                    <p>
                        Ok, now let's take a bowl, throw a few beautiful functions in there and stirrrrrr:
                    </p>
                    <Highlight className='javascript'>
{`const spread = converge(merge, [dissoc, prop]);
spread('home', state);
// => { dispatch: function() {}, title: 'Home page', resources: [] }`}
                    </Highlight>

                </Solution>
            </div>
        );
    },
});

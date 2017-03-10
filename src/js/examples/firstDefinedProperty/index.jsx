/* Get n properties from an element, return first defined / not null */
import React from 'react';
import Highlight from 'react-highlight';
import Problem from 'pages/components/problem';
import Solution from 'pages/components/solution';
import { Tags } from 'pages/components/ramda-helpers';

export default React.createClass({
    displayName: 'FirstDefinedProperty',
    render() {
        return (
            <div className='content'>
                <Problem>
                    <p>
                        We have a <strong>user</strong> object and we want to get a <strong>first name</strong>. If it
                        is not there, we want to get a <strong>username</strong>.
                    </p>
                    <p>
                        <strong>Simple.</strong>
                    </p>
                </Problem>
                <Solution solutionLink='https://goo.gl/DD35v2'>
                    <p>
                        Let's define our <strong>user</strong> first:
                    </p>
                    <Highlight className='javascript'>
{`const user = {
    firstName: 'Freddy Krueger',
    username: 'magic_pie'
};`}
                    </Highlight>
                    <p>
                        ... and our function:
                    </p>
                    <Highlight className='javascript'>
{`const getName = compose(apply(or), props);
getName(['firstName', 'username'], user);
// => Freddy Krueger

getName(['firstName', 'username'], { username: 'magic_pie' });
// => magic_pie`}
                    </Highlight>
                    <p>
                        {Tags(['compose', 'apply', 'or', 'props'])}
                    </p>
                    <p>
                        What if we want to pass more properties to pick from? Right now, our function doesn't support
                        that. And also, can our function be used for any other object? Of course it can. Even now, if we
                        change <strong>getName</strong> to something else, our function body is already dynamic itself.
                    </p>
                    <p>
                        Let's change our functionality a bit:
                    </p>
                    <Highlight className='javascript'>
{`const firstProp = compose(reduce(or, null), props);

const propsToTake = ['firstName', 'lastName', 'username'];

const user = {
    firstName: 'Freddy',
    lastName: 'Krueger',
    username: 'magic_pie'
};

firstProp(propsToTake, user);
// => Freddy

firstProp(propsToTake, {
    lastName: 'Krueger',
    username: 'magic_pie'
});
// => Krueger

firstProp(propsToTake, { username: 'magic_pie' });
// => magic_pie`}
                    </Highlight>
                    <p>
                        {Tags(['compose', 'reduce', 'or', 'props'])}
                    </p>
                    <p>
                        But it's a bit frustrating to pass <strong>propsToTake</strong> all the time, right? Let's make
                        it more dynamic.
                    </p>
                    <Highlight className='javascript'>
{`const firstProp = curry(compose(reduce(or, null), props));

const getName = firstProp(['firstName', 'lastName', 'username']);

const user = {
    firstName: 'Freddy',
    lastName: 'Krueger',
    username: 'magic_pie'
};

getName(user);
// => Freddy

getName({ lastName: 'Krueger', username: 'magic_pie' });
// => Krueger

getName({ username: 'magic_pie' });
// => magic_pie`}
                    </Highlight>
                    <p>
                        {Tags(['curry', 'compose', 'reduce', 'or', 'props'])}
                    </p>
                    <p>
                        Much better, right?
                    </p>
                </Solution>
            </div>
        );
    }
});

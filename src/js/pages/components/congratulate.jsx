import React from 'react';
import {
    nth,
    length,
    compose,
    multiply,
    identity,
    converge
} from 'ramda';

const getRandom = converge(nth, [
    compose(Math.floor, x => multiply(Math.random(), x), length),
    identity
]);

const titles = [
    'Congratulations!',
    'Nice!',
    'Very nice!',
    'Well done!',
    'Sweet!',
    'Awesome!',
];

const descriptions = [
    <span>You are one step closer to becoming fully <strong>functional</strong>.</span>,
    <span>You can now haz <strong>cheez</strong>, safely!</span>,
    <span>You can now speak <strong>Funk Chanel</strong>.</span>,
    <span>Welcome to <strong>Funk Chanel</strong>.</span>,
    <span>The world is functional, again.</span>,
];

export default () => (
    <article className='message is-primary'>
        <div className='message-header'>
            <p>{getRandom(titles)}</p>
        </div>
        <div className='message-body'>{getRandom(descriptions)}</div>
    </article>
);

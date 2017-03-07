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
    'You are one step closer to becoming fully <strong>functional</strong>.',
    'You can now haz <strong>cheez</strong>, safely!',
    'You can now speak <strong>Funk Chanel</strong>.',
    'Welcome to <strong>Funk Chanel</strong>.'
];

export default () => (
    <article className='message is-success'>
        <div className='message-header'>
            <p>{getRandom(titles)}</p>
        </div>
        <div className='message-body' dangerouslySetInnerHTML={{__html: getRandom(descriptions)}} />
    </article>
);

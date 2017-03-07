import React from 'react';
import { map } from 'ramda';

const Tag = tag => (
    <span className='tag' key={tag} style={{marginRight: 10}}>
        <a href={`http://ramdajs.com/docs/#${tag}`} target='_blank'>{tag}</a>
    </span>
);
export const Tags = tags => map(Tag, tags);

export const Repl = props => (
    <div>
        <hr/>
        <h6 className='subtitle'>See it in action <a href={props.link} target='_blank'>here</a>.</h6>
        <hr/>
    </div>
);
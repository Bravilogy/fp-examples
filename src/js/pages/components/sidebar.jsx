import React from 'react';
import examples from 'examples/index';
import { IndexLink, Link } from 'react-router';
import { map, length } from 'ramda';

const LinkComponent = link => (
    <li key={link.path}>
        <Link to={`/examples/${link.path}`} activeClassName='is-active'>
            {link.title}
        </Link>
    </li>
);

export default () => (
    <aside className='menu'>
        <nav className='level'>
            <div className='level-item has-text-centered'>
                <div>
                    <p className='heading'>Total examples</p>
                    <p className='title'>{length(examples)}</p>
                </div>
            </div>
        </nav>
        <hr/>
        <p className='menu-label'>
            General
        </p>
        <ul className='menu-list'>
            <li>
                <IndexLink to='/' activeClassName={'is-active'}>
                    Home
                </IndexLink>
            </li>
        </ul>
        <p className='menu-label'>
            Examples
        </p>
        <ul className='menu-list'>
            {map(LinkComponent, examples)}
        </ul>
    </aside>
);
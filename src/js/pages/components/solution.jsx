import React from 'react';
import { Repl } from 'pages/components/ramda-helpers';
import Congratulate from 'pages/components/congratulate';

export default ({ children, solutionLink}) => (
    <section>
        <h4>Solution</h4>
        {children}
        {solutionLink ? <Repl link={solutionLink} /> : <hr/>}
        <Congratulate />
    </section>
);
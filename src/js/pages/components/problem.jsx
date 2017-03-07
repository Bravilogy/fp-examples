import React from 'react';

export default props => (
    <section>
        <h4>Problem</h4>
        <blockquote>
            {props.children}
        </blockquote>
        <hr/>
    </section>
)
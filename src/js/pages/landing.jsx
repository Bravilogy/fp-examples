import React from 'react';

export default React.createClass({
    render() {
        return (
            <section className='content'>
                <h4>Dear <strong>composable</strong> friend.</h4>
                <p>
                    I hope you enjoy every single bit of <strong>code</strong> on this amazing app. I thought it would
                    be cool to have a nice repo for real life examples of using functional approach to very <strong>common</strong> or <strong>not-so-common</strong> problems.
                </p>
                <p>
                    I will be using <a href="http://ramdajs.com/" target="_blank">ramda.js</a> library in most cases and
                    a few nice functional data types in some other cases:<br/>
                    <a href="https://github.com/folktale/data.either" target="_blank">data.either</a>, <a
                    href="https://github.com/folktale/data.maybe" target="_blank">data.maybe</a>, <a
                    href="https://github.com/folktale/data.task" target="_blank">data.task</a>.
                </p>
                <p>
                    <strong>Enough reading.</strong> Now go functional!
                </p>
            </section>
        );
    },
});
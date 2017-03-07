import React from 'react';
import Header from 'pages/components/header';
import Sidebar from 'pages/components/sidebar';

const Component = React.createClass({
    displayName: 'Application',
    render() {
        return (
            <section className='section'>
                <Header />
                <div className='container'>
                    <div className='columns'>
                        <div className='column'>
                            <Sidebar />
                        </div>
                        <div className='column is-three-quarters'>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </section>
        );
    },
});

export default Component;


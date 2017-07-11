import React from 'react';
import Header from 'pages/components/header';
import Sidebar from 'pages/components/sidebar';

export default props => (
    <section className='section'>
        <Header />
        <div className='container'>
            <div className='columns'>
                <div className='column'>
                    <Sidebar />
                </div>
                <div className='column is-three-quarters'>
                    {props.children}
                </div>
            </div>
        </div>
    </section>
);

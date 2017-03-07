import React from 'react';
import Landing from 'pages/landing';
import Example from 'pages/example';
import Application from 'pages/application';
import { Route, IndexRoute, Router, hashHistory } from 'react-router';

export default (
    <Router history={hashHistory}>
        <Route path='/' component={Application}>
            <IndexRoute component={Landing} />
            <Route path='/examples/:id' component={Example} />
        </Route>
    </Router>
);
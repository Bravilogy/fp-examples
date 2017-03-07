import React from 'react';
import routes from 'routes.js';
import ReactDOM from 'react-dom';
import reducer from 'reducer.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import '../scss/app.scss'

const store = createStore(reducer);

function bootstrap() {
    ReactDOM.render(
        <Provider store={store}>{routes}</Provider>,
        document.getElementById('app')
    );
}

store.subscribe(bootstrap);
bootstrap();

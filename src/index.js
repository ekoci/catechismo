import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import App from './components/App';
import { store, history } from './store';
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
    <Provider store={store} context={ReactReduxContext}>
        <App history={history} context={ReactReduxContext} />
    </Provider>,
    document.getElementById('root'),
);
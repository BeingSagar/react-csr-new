import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from './app/reducers';

const { NODE_ENV } = process.env;
export const history = createBrowserHistory();

export const store = createStore(
    connectRouter(history)(combineReducers(reducers)),
    compose(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        ),
        NODE_ENV === 'development' &&
            // eslint-disable-next-line no-underscore-dangle
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
    ),
);

export const dispatchAction = (action) => (store.dispatch(action));
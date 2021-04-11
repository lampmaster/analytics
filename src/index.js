import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {todoListReducer} from "./store/reducers/todoListReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(
    todoListReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);

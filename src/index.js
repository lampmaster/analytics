import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {todoListReducer} from "./store/reducers/todoListReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {loadState, saveState} from "./store/localStorage";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const persistedState = loadState();

const store = createStore(
    todoListReducer,
    persistedState,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);

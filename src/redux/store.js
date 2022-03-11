import React from 'react';
import userReducer from './reducers/userReducer';

let state = {}

export const createStore = (reducer, initialState, enhancer) => {
    let store = {};
    store.state = initialState;
    store.listeners = [];
    
    // function to get state
    store.getState = () => store.state;

    store.subscribe = (subscriber) => {
        store.listeners.push(subscriber);
    }

    // function dispatch which updates state and calls all listeners
    store.dispatch = (action) => {
        store.state = reducer(store.state, action);
        store.listeners.forEach(fn => fn());
    }

    return store;
}

const combineReducers = (reducers) => {
    return (state, action={}) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {})
    };
}

const rootReducer = combineReducers({ user: userReducer })

const store = createStore(rootReducer, state)

const ReduxContext = React.createContext('redux');

export const Provider = ({ children }) => {
    return (
        <ReduxContext.Provider value={store}>
            {children}
        </ReduxContext.Provider>
    )
}

export default store;
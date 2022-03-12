import React from 'react';
import { logger, persist, thunk } from './middlewares/logger';
import userReducer from './reducers/userReducer';

let state = {}

const enhanceWrapper = (args) => (wrappedFunction) => {
    function fun (action) {
        thunk(args, () => {
            if(typeof action === "function"){
                return action(fun);
            }
            logger(args, () => {
                persist(args, () => {
                    wrappedFunction(action);
                })
            })
        })
    }
    return fun;
}

export const createStore = (reducer, initialState, ...enhancer) => {
    let store = {};
    store.state = initialState;
    store.listeners = [];
    
    // function to get state
    store.getState = () => store.state;

    store.subscribe = (subscriber) => {
        store.listeners.push(subscriber);
    }
    // function dispatch which updates state and calls all listeners
    store.dispatch = enhanceWrapper({ getState: store.getState })((action) => {
        store.state = reducer(store.state, action);
        store.listeners.forEach(fn => fn());
    })



    // for(let i=0; i<enhancer.length; i++){
    //     if(i=== enhancer.length-1){
    //         enhancer[i]({getState: store.getState}, store.dispatch)
    //     }else{
    //         enhancer[i]({getState: store.getState}, enhancer[i+1])
    //     }
    // }

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

const appReducer = combineReducers({ user: userReducer })

const rootReducer = (state, action) => {
    if(action.type === "LOGOUT"){
        state = null;
    }
    return appReducer(state, action)
}


const compose = (...funcs) => {
    if (funcs.length === 0) {
        return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
    
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

const applyMiddlewares = (...middlewares) => {
    return (createStore) => (reducer, preloadedState) => {
        const store = createStore(reducer, preloadedState)
        console.log(createStore, reducer, preloadedState, store)
        const middleWareArgs = {
            getState: store.getState(),
            dispatch: store.dispatch,
        }
        return middlewares.map(middleware => middleware(middleWareArgs))
    }
}

const store = createStore(rootReducer, state, logger, persist)

const ReduxContext = React.createContext('redux');

export const Provider = ({ children }) => {
    return (
        <ReduxContext.Provider value={store}>
            {children}
        </ReduxContext.Provider>
    )
}

export default store;
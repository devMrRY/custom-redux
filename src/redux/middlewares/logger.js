export const logger = (args, next) => {
    let { getState } = args;
    console.log(getState())
    next(args)
}

export const persist = (args, next) => {
    let { getState } = args;
    let state = getState();
    localStorage.setItem("appState", JSON.stringify(state));
    next(args)
}

export const thunk = (args, next) => {
    let { action, fun} = args;
    if(typeof action === "function"){
        return action(fun);
    }
    next(args)
}

// export default function applyMiddleware(...middlewares) {
//     return (createStore) => (reducer, preloadedState) => {
//         const store = createStore(reducer, preloadedState)
//         let dispatch = () => {
//           throw new Error(
//             'Dispatching while constructing your middleware is not allowed. ' +
//               'Other middleware would not be applied to this dispatch.'
//           )
//         }
  
//         const middlewareAPI = {
//           getState: store.getState,
//           dispatch: (action, ...args) => dispatch(action, ...args)
//         }
//         const chain = middlewares.map(middleware => middleware(middlewareAPI))
//         // dispatch = compose(...chain)(store.dispatch)
  
//         return {
//           ...store,
//           dispatch
//         }
//       }
//   }
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
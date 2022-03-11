const initialState = {
    isAuth: false,
    userData: null,
}

const user = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN_SUCCESS": 
            return {
                ...state,
                isAuth: true,
                userData: action.payload
            }
        case "LOGOUT": 
            return {
                ...state,
                isAuth: false,
                userData: null
            }
        default:
            return state;
    }
}

export default user;
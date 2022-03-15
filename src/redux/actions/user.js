export const onUpdateUser = (payload) => (dispatch) => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    }).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS', payload });
    })
}
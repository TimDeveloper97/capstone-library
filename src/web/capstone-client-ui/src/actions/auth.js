
export const saveUserSession = (user) => async (dispatch) => {
    dispatch({type: "SAVE_USER", payload: user});
}

export const clearUserSession = () => async (dispatch) => {
    dispatch({type: "SAVE_USER", payload: {}});
}
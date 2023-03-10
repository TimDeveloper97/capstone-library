
const auth = (state = {}, action) => {
    switch(action.type){
        case "SAVE_USER": 
            return action.payload;
        default: return state;
    }
}
export default auth;
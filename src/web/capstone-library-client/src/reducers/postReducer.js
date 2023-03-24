const post = (state = [], action) => {
    switch(action.type){
        case "GET_POSTS":
            return action.payload;
        default:
            return state;
    }
}

export default post;
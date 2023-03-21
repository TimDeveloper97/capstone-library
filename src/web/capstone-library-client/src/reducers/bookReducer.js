const book = (state = null, action) => {
    switch(action.type){
        case "ADD_BOOK":{
            return action.payload;
        }
        case "GET_BOOKS": {
            return action.payload;
        }
        default: return state;
    }
}

export default book;
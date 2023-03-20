const book = (state = null, action) => {
    switch(action.type){
        case "ADD_BOOK":{
            return action.payload;
        }
        default: return state;
    }
}

export default book;
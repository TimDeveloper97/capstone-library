const book = (state = [], action) => {
    switch(action.type){
        case "ADD_BOOK":{
            return action.payload;
        }
        case "GET_BOOKS": {
            return action.payload;
        }
        case "GET_BOOKS_BY_CATEGORY":
            return action.payload;
        case "DELETE_BOOK":
            return state.filter(book => book.id !== action.payload);
        default: return state;
    }
}

export default book;
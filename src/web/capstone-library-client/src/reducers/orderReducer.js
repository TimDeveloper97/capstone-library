const order = (state = [], action) => {
    switch(action.type){
        case "GET_ORDER":
            return action.payload;
        case "REMOVE_ORDER":
            return state.filter(s => s.id !== action.payload);
        default:
            return state;
    }
}

export default order;

const category = (state = null, action) => {
    switch(action.type){
        case "GET_CATEGORIES": 
            return action.payload;
        default: return state;
    }
}
export default category;
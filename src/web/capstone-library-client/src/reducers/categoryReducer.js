const category = (state = null, action) => {
  switch (action.type) {
    case "GET_CATEGORIES": {
      return action.payload;
    } 
    case "ADD_CATEGORY": {
      return [...state, action.payload];
    }
    case "DELETE_CATEGORY": {
      return state.filter(cate => cate.nameCode !== action.payload);
    }
    default:
      return state;
  }
};

export default category;

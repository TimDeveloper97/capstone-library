const user = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER": {
      return action.payload;
    }
    case "UPDATE_USER": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default user;

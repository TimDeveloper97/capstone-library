const user = (state = null, action) => {
  switch (action.type) {
    case "GET_USER":
    case "CLEAR_SESSION":
    case "UPDATE_USER": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default user;

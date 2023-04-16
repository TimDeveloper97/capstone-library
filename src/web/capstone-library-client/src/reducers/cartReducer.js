const cart = (state = 0, action) => {
  switch (action.type) {
    case "GET_CART":
      return action.payload;
    case "ADD_TO_CART":
      return (state += action.payload);
    case "REMOVE_FROM_CART":
      return (state -= action.payload);
    default:
      return state;
  }
};

export default cart;

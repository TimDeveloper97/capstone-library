import { getOrder } from "../apis/order";

export const getNumberOfCart = () => async (dispatch) => {
  const { data } = await getOrder();
  dispatch({ type: "GET_CART", payload: data.value ? data.value.length : 0 });
};

export const addToCart = () => async (dispatch) => {
  dispatch({ type: "ADD_TO_CART", payload: 1 });
};

export const removeFromCart = (num) => async (dispatch) => {
  dispatch({ type: "REMOVE_FROM_CART", payload: num });
};

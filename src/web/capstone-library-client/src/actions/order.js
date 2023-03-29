import * as api from "../apis/order";

export const orderBook = (post) => async (dispatch) => {
  const response = await api.orderBook(post);
  //console.log(response);
  return response.data;
};

export const getOrder = () => async (dispatch) => {
  const { data } = await api.getOrder();
  //console.log(data);
  dispatch({ type: "GET_ORDER", payload: data.value ? data.value : [] });
};

export const removeOrder = (id) => async (dispatch) => {
  const response = await api.removeOrder(id);
  console.log(response);
  dispatch({ type: "REMOVE_ORDER", payload: id });
};

export const checkout = (data) => async (dispatch) => {
  console.log(data);
  const response = await api.checkout(data);
  return response.data;
};

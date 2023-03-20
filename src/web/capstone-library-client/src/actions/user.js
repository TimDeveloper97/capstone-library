import * as api from "../apis/user";

export const updateUser = (data) => async (dispatch) => {
  const response = await api.updateUser(data);
  console.log(response);
  window.localStorage.setItem("user", JSON.stringify(data));
  dispatch({ type: "UPDATE_USER", payload: data });
};

export const getUser = (data) => (dispatch) => {
  dispatch({ type: "GET_USER", payload: data });
};

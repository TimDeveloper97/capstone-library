import * as api from "../apis/user";

export const updateUser = (data) => async (dispatch) => {
  const response = await api.updateUser(data);
  console.log(data);
  window.localStorage.setItem("user", JSON.stringify(data));
  dispatch({ type: "UPDATE_USER", payload: data });
};

export const getUser = (id) => async (dispatch) => {
  const { data } = await api.viewProfile(id);
  dispatch({ type: "GET_USER", payload: data.value });
};

export const clearSession = () => (dispatch) => {
  window.localStorage.clear();
  dispatch({ type: "CLEAR_SESSION", payload: null });
};

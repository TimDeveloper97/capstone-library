import * as api from "../apis/user";

export const updateUser = (data) => async (dispatch) => {
  const response = await api.updateUser(data);
  console.log(response);
  window.localStorage.setItem("user", data);
  dispatch({ type: "UPDATE_USER", payload: data });
};

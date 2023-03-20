import * as api from "../apis/category";

export const getCategories = () => async (dispatch) => {
  const response = await api.getAllCategories();
  dispatch({ type: "GET_CATEGORIES", payload: response.data.value });
};

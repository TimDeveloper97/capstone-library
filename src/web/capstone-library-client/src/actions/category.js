import * as api from "../apis/category";

export const getCategories = () => async (dispatch) => {
  const response = await api.getAllCategories();
  dispatch({ type: "GET_CATEGORIES", payload: response.data.value });
};

export const addCategory = (data) => async (dispatch) => {
  const response = await api.addCategory(data);
  response.data.success && dispatch({type: "ADD_CATEGORY", payload: data});
  return response.data;
}

export const deleteCategory = (id) => async (dispatch) => {
  const response = await api.deleteCategory(id);
  dispatch({type: "DELETE_CATEGORY", payload: id});
  return response.data;
}
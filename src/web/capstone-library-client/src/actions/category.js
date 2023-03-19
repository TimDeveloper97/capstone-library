import * as api from "../apis/category";

export const getCategories = () => async (dispatch) => {
  const response = await api.getAllCategories();
  console.log(response);
};

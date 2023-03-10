import * as api from "../apis/category";

export const getAllCategories = () => async (dispatch) => {
    const { data } = await api.getAllCategories();
    dispatch({type: "GET_CATEGORIES", payload: data});
}
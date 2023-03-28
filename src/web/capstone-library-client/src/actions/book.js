import * as api from "../apis/book";

export const addBook = (data) => async (dispatch) => {
  const response = await api.addBook(data);
  return response.data;
};

export const getBooks = () => async (dispatch) => {
  const response = await api.getBooks();
  dispatch({ type: "GET_BOOKS", payload: response.data.value });
};

export const getUserBooks = () => async (dispatch) => {
  const response = await api.getUserBooks();
  dispatch({ type: "GET_BOOKS", payload: response.data.value });
};

export const getBooksByCategory = (listBook) => (dispatch) => {
  dispatch({type: "GET_BOOKS_BY_CATEGORY", payload: listBook});
}
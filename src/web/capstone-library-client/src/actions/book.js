import * as api from "../apis/book";

export const addBook = (data) => async (dispatch) => {
  const response = await api.addBook(data);
  return response.data;
};

export const updateBook = (data) => async (dispatch) => {
  const response = await api.updateBook(data);
  return response.data;
};

export const getBooks = () => async (dispatch) => {
  const response = await api.getBooks();
  dispatch({
    type: "GET_BOOKS",
    payload: response.data.value
      ? response.data.value.sort((a, b) => a.id - b.id).slice()
      : [],
  });
};

export const getUserBooks = () => async (dispatch) => {
  const response = await api.getUserBooks();
  dispatch({
    type: "GET_BOOKS",
    payload: response.data.value
      ? response.data.value.sort((a, b) => a.id - b.id).slice()
      : [],
  });
};

export const getBooksByCategory = (listBook) => (dispatch) => {
  dispatch({ type: "GET_BOOKS_BY_CATEGORY", payload: listBook });
};

export const deleteBook = (id) => async (dispatch) => {
  const response = await api.deleteBook(id);
  response.success && dispatch({ type: "DELETE_BOOK", payload: id });
  return response.data;
};

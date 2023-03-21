import * as api from "../apis/book";

export const addBook = (data) => async (dispatch) => {
    const response = await api.addBook(data);
    console.log(response);
}

export const getBooks = () => async (dispatch) => {
    const response = await api.getBooks();
    dispatch({type: "GET_BOOKS", payload: response.data.value});
}

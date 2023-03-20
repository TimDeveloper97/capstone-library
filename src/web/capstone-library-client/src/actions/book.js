import * as api from "../apis/book";

export const addBook = (data) => async (dispatch) => {
    console.log("run action");
    const response = await api.addBook(data);
    console.log(response);
}
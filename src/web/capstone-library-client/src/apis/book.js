import axiosIntance from "../helper/axios";

export const addBook = (data) => axiosIntance.post('/books/add', data);
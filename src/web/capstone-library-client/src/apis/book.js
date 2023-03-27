import axiosIntance from "../helper/axios";

export const addBook = (data) => axiosIntance.post("/books/add", data);

export const getBooks = () => axiosIntance.get("/books");

export const getBookById = (id) => axiosIntance.get(`/books/${id}`);

export const getUserBooks = () => axiosIntance.get("/books/me");

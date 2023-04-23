import axiosIntance from "../helper/axios";

export const addBook = (data) => axiosIntance.post("/books/add", data);

export const getBooks = () => axiosIntance.get("/books");

export const getBookById = (id) => axiosIntance.get(`/books/${id}`);

export const getUserBooks = () => axiosIntance.get("/books/me");

export const deleteBook = (id) => axiosIntance.delete(`/books/delete/${id}`);

export const getPostByBook = (id) => axiosIntance.get(`/posts/has-book/${id}`);

export const updateBook = (data) =>
  axiosIntance.put("/admin/books/update", data);

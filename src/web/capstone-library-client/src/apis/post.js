import axiosIntance from "../helper/axios";

export const addPost = (data) => axiosIntance.post("/posts/add", data);

export const getPosts = () => axiosIntance.get("/posts");

export const getPostById = (id) => axiosIntance.get(`/posts/${id}`);

export const getPostRequest = () => axiosIntance.get("/posts/request");

export const acceptPost = (id) => axiosIntance.put(`/posts/accept-post/${id}`);

export const denyPost = (id, reason) => axiosIntance.put(`/posts/deny-post/${id}`, reason);

export const getPostByUser = () => axiosIntance.get("/posts/me");

export const deletePost = (id) => axiosIntance.delete(`/posts/delete/${id}`);

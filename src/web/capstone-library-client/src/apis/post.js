import axiosIntance from "../helper/axios";

export const addPost = (data) => axiosIntance.post('/posts/add', data);

export const getPosts = () => axiosIntance.get("/posts");

export const getPostById = (id) => axiosIntance.get(`/posts/${id}`);
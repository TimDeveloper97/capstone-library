import axiosIntance from "../helper/axios";

export const addPost = (data) => axiosIntance.post('/posts/add', data);
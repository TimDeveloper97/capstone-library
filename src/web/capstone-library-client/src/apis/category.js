import axiosIntance from "../helper/axios";

export const getAllCategories = () => axiosIntance.get("/admin/categories");

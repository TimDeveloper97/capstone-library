import axiosIntance from "../helper/axios";

export const getAllCategories = () => axiosIntance.get("/admin/categories");

export const addCategory = (data) => axiosIntance.post("/admin/categories/add", data);

export const deleteCategory = (id) => axiosIntance.delete(`/admin/categories/delete/${id}`);

export const updateCategory = (data) => axiosIntance.put("/admin/categories/update", data);
import axiosIntance from "../helper/axios";

export const updateUser = (data) => axiosIntance.put("/update-profile", data);

export const resetPassword = (data) =>
  axiosIntance.post("/forgot-password", data);

export const viewProfile = (id) => axiosIntance.get(`/view-profile/${id}`);

export const getAllUser = () => axiosIntance.get("/admin/users");

export const updateRoleUser = (id, data) => axiosIntance.put(`/admin/users/role-update/${id}`, data);

export const getConfig = () => axiosIntance.get("/admin/config");

export const updateConfig = (data) => axiosIntance.put("/admin/config/update", data);
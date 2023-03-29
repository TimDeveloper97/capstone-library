import axiosIntance from "../helper/axios";

export const updateUser = (data) => axiosIntance.put("/update-profile", data);

export const resetPassword = (data) =>
  axiosIntance.post("/forgotpassword", data);

export const viewProfile = (id) => axiosIntance.get(`/view-profile/${id}`);

import axiosIntance from "../helper/axios";

export const updateUser = (data) => axiosIntance.put("/update-profile", data);

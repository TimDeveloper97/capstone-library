import axiosIntance from "../helper/axios";

export const getStoreAsync = () => axiosIntance.get("/store");
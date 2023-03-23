import axiosIntance from "../helper/axios";

export const orderBook = (id) => axiosIntance.put(`/order-book/${id}`);
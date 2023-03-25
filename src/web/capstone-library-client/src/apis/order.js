import axiosIntance from "../helper/axios";

export const orderBook = (id) => axiosIntance.put(`/order-book/${id}`);

export const getOrder = () => axiosIntance.get('/cart');

export const removeOrder = (id) => axiosIntance.delete(`/cart/remove-item/${id}`);

export const checkout = (data) => axiosIntance.post("/checkout", data);

export const getOrderStatus = () => axiosIntance.get("/order/request");
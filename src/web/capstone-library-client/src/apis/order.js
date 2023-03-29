import axiosIntance from "../helper/axios";

export const orderBook = (id) => axiosIntance.put(`/order-book/${id}`);

export const getOrder = () => axiosIntance.get("/cart");

export const removeOrder = (id) =>
  axiosIntance.delete(`/cart/remove-item/${id}`);

export const checkout = (data) => axiosIntance.post("/checkout", data);

export const getOrderStatus = () => axiosIntance.get("/order/request");

export const confirmOrder = (id) =>
  axiosIntance.put(`/order/confirmation/${id}`);

export const denyOrder = (id) => axiosIntance.put(`/order/cancellation/${id}`);

export const receivedOrder = (id) => axiosIntance.put(`/order/received/${id}`);

export const bookReturn = (id) => axiosIntance.put(`/order/book-returns/${id}`);

export const getRecharge = () => axiosIntance.get("/api/recharge");
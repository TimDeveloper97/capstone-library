import axiosIntance from "../helper/axios";

export const getNotification = () => axiosIntance.get("/notification");

export const changeNotificationStatus = (id) =>
  axiosIntance.put(`/notification/${id}`);

export const changeAllNotification = () => {
  axiosIntance.put(`/notification/read-all`);
};

import moment from "moment/moment";

const getImgUrl = (img) => {
  return "http://localhost:8090" + img;
};

const isAdmin = (user) => {
  return user.roles[0] === "ROLE_ADMIN";
};
const getColorStatus = (status) => {
  switch (status) {
    case 2:
      return {
        color: "#EA5455",
        state: "Từ chối",
      };
    case 32:
      return {
        color: "#FC7300",
        state: "Đã thanh toán",
      };
    case 64:
      return {
        color: "#1C82AD",
        state: "Đợi lấy sách",
      };
    case 128:
      return {
        color: "#D4D925",
        state: "Chưa trả sách",
      };
    case 256:
      return {
        color: "#3CCF4E",
        state: "Thành công",
      };
    default:
      return {
        color: "green",
        state: "default",
      };
  }
};

const convertToDay = (input) => {
  const day = new Date(input);
  return moment(day).format("D/MM/YYYY");
};

const getTimeAgo = (time) => {
  const curDate = new Date();
  const inputDate = new Date(time);
  const diff = curDate - inputDate;
  const msPerDay = 3600 * 24 * 1000;
  const msPerHour = 3600 * 1000;
  if (diff < msPerDay) {
    return `${diff / msPerHour + 1} giờ trước`;
  } else {
    return convertToDay(time);
  }
};

export { getImgUrl, isAdmin, getColorStatus, getTimeAgo };

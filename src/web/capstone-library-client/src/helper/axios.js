import axios from "axios";

const token = window.localStorage.getItem("token");
//console.log(token);
const axiosIntance = axios.create({
  baseURL: "http://192.168.137.206:8090/api/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosIntance;

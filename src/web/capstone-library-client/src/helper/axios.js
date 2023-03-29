import axios from "axios";

const token = window.localStorage.getItem("token");
//console.log(token);
const axiosIntance = axios.create({
  baseURL: "http://localhost:8090/api/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosIntance;

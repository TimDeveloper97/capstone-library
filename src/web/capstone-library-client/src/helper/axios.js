import axios from "axios";

const token = window.localStorage.getItem("token");
//console.log(token);
const axiosIntance = axios.create({
  baseURL: "http://localhost:8888/api/",
  headers: {
    Authorization: token ? token : "",
  },
});

export default axiosIntance;
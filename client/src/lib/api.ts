import axios from "axios";

const api = axios.create({
  baseURL: "http://el-ngadu.test/api",
  withCredentials: true,
});

export default api;

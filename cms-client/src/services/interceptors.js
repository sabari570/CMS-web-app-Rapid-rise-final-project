import axios from "axios";
import { CMS_BACKEND_BASEURL } from "../constants/appConstants";

// Creating an axios instance
const axiosInstance = axios.create({
  baseURL: CMS_BACKEND_BASEURL,
  withCredentials: true,
});

// Adding a request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Adding a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;

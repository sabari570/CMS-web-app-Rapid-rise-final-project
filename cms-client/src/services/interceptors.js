import axios from "axios";

// Creating an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CMS_APP_BACKEND_URL,
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

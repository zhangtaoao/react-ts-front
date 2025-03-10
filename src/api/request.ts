import axios from "axios";

const baseUrl = import.meta.env.VITE_APP_API || '/api';

const request = axios.create({
  timeout: 5000,
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  if (config?.url && !config?.url.startsWith(baseUrl)) {
    config.url = baseUrl + config.url;
  }
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use((response) => {
  // TODO：状态码处理
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default request;
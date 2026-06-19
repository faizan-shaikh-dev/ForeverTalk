import axios from "axios";

const getBaseUrl = () => {
  return import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
};

const API = axios.create({
  baseURL: `${getBaseUrl()}/api`,
  timeout: 10000,
});

// Request interceptor to automatically attach authorization token
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;

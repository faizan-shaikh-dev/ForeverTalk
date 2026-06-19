import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:5000";
  }
  return import.meta.env.VITE_API_BASE_URL || "https://forevertalk.onrender.com";
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

import axios from "axios";

const api = axios.create({
  baseURL: "https://typically-wheylike-magen.ngrok-free.dev/api/v3/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["ngrok-skip-browser-warning"] = "true";
  return config;
});

export default api;

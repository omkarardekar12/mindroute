import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export default api;

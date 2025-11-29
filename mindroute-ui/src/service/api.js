import axios from "axios";

const BACKEND_URL = import.meta.env.BACKEND_URL;

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
});

export default api;

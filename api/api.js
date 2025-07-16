import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_LOCAL_BACKEND ||
    "https://cars24-v2-backend.onrender.com/api/v1",
  withCredentials: true,
});

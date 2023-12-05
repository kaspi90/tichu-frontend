import axios from "axios";

export const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/";

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

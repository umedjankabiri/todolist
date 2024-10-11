import axios from "axios";

export const todolistInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "api-key": import.meta.env.VITE_API_KEY,
  },
});

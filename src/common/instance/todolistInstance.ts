import axios from "axios";

export const todolistInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        "api-key": import.meta.env.VITE_API_KEY
    }
})

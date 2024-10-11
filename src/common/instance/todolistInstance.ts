import axios from "axios";

export const todolistInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        "api-key": process.env.REACT_APP_API_KEY,
    }
})

import axios from "axios";

export const taskInstance = (todolistId: string) => {
    return axios.create({
        baseURL: `${import.meta.env.VITE_BASE_URL}/${todolistId}/`,
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
            "api-key": import.meta.env.VITE_API_KEY
        }
    })
}

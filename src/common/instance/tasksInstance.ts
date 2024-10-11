import axios from "axios";

export const tasksInstance = (id: string) => {
    return axios.create({
        baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/`,
        headers: {
            Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
            "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
        }
    })
}

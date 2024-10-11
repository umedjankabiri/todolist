import axios from "axios";

export const todolistInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
        "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
    }
})

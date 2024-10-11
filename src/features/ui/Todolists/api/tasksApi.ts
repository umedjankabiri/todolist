import axios from "axios";
import {GetTasksResponse} from "features/ui/Todolists/types/tasksApi.types.ts";

export const tasksApi = {
    getTasks(id: string) {
        return axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}/tasks`, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        })
    }
}

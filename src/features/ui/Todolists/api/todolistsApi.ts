import axios from "axios";
import {
    CreateDeleteTodolistResponse,
    DeleteTodolistResponse,
    Todolist,
    UpdateTodolistResponse
} from "features/ui/Todolists/types/todolistApi.types.ts";

export const todolistsApi = {
    getTodolists() {
        return axios.get<Todolist[]>(
            "https://social-network.samuraijs.com/api/1.1/todo-lists", {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                    "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
                }
            });
    },
    createTodolist(title: string) {
        return axios.post<CreateDeleteTodolistResponse>("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title}, {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                    "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
                }
            })
    },
    updateTodolist(payload: {id: string, title: string}) {
        const {id, title} = payload;
        return axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        })
    },
    deleteTodolist(todolistID: string) {
        return axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        })
    }
}

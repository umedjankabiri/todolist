import axios from "axios";
import {
    CreateDeleteTodolistResponse,
    DeleteTodolistResponse,
    Todolist,
    UpdateTodolistResponse
} from "features/ui/Todolists/types/todolistApi.types.ts";
import {instance} from "common/instance/instance.ts";

export const todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<CreateDeleteTodolistResponse>(`todo-list`, {title})
    },
    updateTodolist(payload: {id: string, title: string}) {
        const {id, title} = payload;
        return instance.put<UpdateTodolistResponse>(`todo-lists/${id}`, {title: title},)
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

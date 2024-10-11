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
    updateTodolist(payload: { id: string, title: string }) {
        const {id, title} = payload;
        return instance.put<UpdateTodolistResponse>(`todo-lists/${id}`, {title: title},)
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<DeleteTodolistResponse>(`todo-lists/${todolistID}`)
    }
}

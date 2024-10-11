import {
    CreateDeleteTodolistResponse,
    DeleteTodolistResponse,
    Todolist,
    UpdateTodolistResponse
} from "features/ui/Todolists/types/todolistApi.types.ts";
import {todolistInstance} from "common/instance/todolistInstance.ts";

export const todolistsApi = {
    getTodolists() {
        return todolistInstance.get<Todolist[]>("todo-lists");
    },
    createTodolist(title: string) {
        return todolistInstance.post<CreateDeleteTodolistResponse>(`todo-lists`, {title})
    },
    updateTodolist(payload: { id: string, title: string }) {
        const {id, title} = payload;
        return todolistInstance.put<UpdateTodolistResponse>(`todo-lists/${id}`, {title: title},)
    },
    deleteTodolist(todolistID: string) {
        return todolistInstance.delete<DeleteTodolistResponse>(`todo-lists/${todolistID}`)
    }
}

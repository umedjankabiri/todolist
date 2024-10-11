import {todolistInstance} from "common/instance/todolistInstance.ts";
import {BaseResponse, Todolist} from "common/types/Todolists/TodolistsApiProps.ts";

export const todolistsApi = {
    getTodolists() {
        return todolistInstance.get<Todolist[]>("todo-lists");
    },
    createTodolist(title: string) {
        return todolistInstance.post<BaseResponse<{ item: Todolist }>>(`todo-lists`, {title})
    },
    updateTodolist(payload: { id: string, title: string }) {
        const {id, title} = payload;
        return todolistInstance.put<BaseResponse>(`todo-lists/${id}`, {title: title},)
    },
    deleteTodolist(todolistID: string) {
        return todolistInstance.delete<BaseResponse>(`todo-lists/${todolistID}`)
    }
}

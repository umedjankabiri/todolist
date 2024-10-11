import { todolistInstance } from "common/instance/todolistInstance.ts";
import { TodolistsResponse, Todolist } from "common/types/Todolists/TodolistsApiProps.ts";

export const todolistsApi = {
  getTodolists() {
    return todolistInstance.get<Todolist[]>("todo-lists");
  },
  createTodolist(title: string) {
    return todolistInstance.post<TodolistsResponse<{ item: Todolist }>>(`todo-lists`, { title });
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload;
    return todolistInstance.put<TodolistsResponse>(`todo-lists/${id}`, {
      title: title,
    });
  },
  deleteTodolist(todolistID: string) {
    return todolistInstance.delete<TodolistsResponse>(`todo-lists/${todolistID}`);
  },
};

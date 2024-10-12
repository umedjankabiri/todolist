import { taskInstance } from "common/instance/taskInstance.ts";
import { DomainTask, GetTasksResponse, TasksResponse, UpdateTaskModel } from "common/types/Tasks";

export const tasksApi = {
  getTasks(todolistId: string) {
    return taskInstance(todolistId).get<GetTasksResponse>(`tasks`);
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload;
    return taskInstance(todolistId).post<TasksResponse<{ item: DomainTask }>>(`tasks`, { title: title });
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload;
    return taskInstance(todolistId).put<TasksResponse<{ item: DomainTask }>>(`tasks/${taskId}`, model);
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload;
    return taskInstance(todolistId).delete<TasksResponse>(`tasks/${taskId}`);
  },
};

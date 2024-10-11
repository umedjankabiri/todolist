import { taskInstance } from "common/instance/taskInstance.ts";
import {
  DomainTask,
  GetTasksResponse,
  TasksResponse,
  UpdateTaskModel,
} from "common/types/Tasks";

export const tasksApi = {
  getTasks(todolistId: string) {
    return taskInstance(todolistId).get<GetTasksResponse>(`tasks`);
  },
  createTask(title: string, todolistId: string) {
    return taskInstance(todolistId).post<TasksResponse<{ item: DomainTask }>>(
      `tasks`,
      { title: title }
    );
  },
  changeTaskStatus(task: DomainTask, model: UpdateTaskModel) {
    return taskInstance(task.todoListId).put<
      TasksResponse<{ item: DomainTask }>
    >(`tasks/${task.id}`, model);
  },
  changeTaskTitle(title: string, task: DomainTask) {
    return taskInstance(task.todoListId).put<TasksResponse>(
      `tasks/${task.id}`,
      { title: title }
    );
  },
  deleteTask(taskId: string, todolistId: string) {
    return taskInstance(todolistId).delete<TasksResponse>(`tasks/${taskId}`);
  },
};

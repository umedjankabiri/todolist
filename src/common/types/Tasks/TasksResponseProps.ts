import { TaskStatus } from "common/utils/enums/enumTaskStatus.ts";
import { TaskPriority } from "common/utils/enums/enumTaskPriority.ts";

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};
export type TasksKeyState = {
  [key: string]: DomainTask[];
};
export type DomainTask = {
  todoListId: string;
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  order: number;
  deadline: string;
  startDate: string;
  addedDate: string;
};
export type UpdateTaskModel = {
  title: string;
  status: number;
  description: string;
  priority: number;
  startDate: string;
};
export type UpdateTaskDomainModel = {
  title?: string;
  description?: string;
  status?: number;
  priority?: number;
  startDate?: string;
};
export type TasksFieldsErrors = {
  error: string;
  field: string;
};
export type TasksResponse<D = {}> = {
  data: D;
  fieldsErrors: TasksFieldsErrors[];
  messages: string[];
  resultCode: number;
};

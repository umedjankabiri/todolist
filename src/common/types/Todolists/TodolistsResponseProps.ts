import { FilterValueProps } from "common/types/Tasks/FilterValueProps.ts";
import { RequestStatusProps } from "common/types/Status/RequestStatusProps.ts";

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type TodolistFieldsErrors = {
  error: string;
  field: string;
};
export type TodolistsResponse<D = {}> = {
  data: D;
  fieldsErrors: TodolistFieldsErrors[];
  messages: string[];
  resultCode: number;
};
export type DomainTodolist = Todolist & {
  filter: FilterValueProps;
  entityStatus: RequestStatusProps;
};

import { FilterValueProps } from "common/types/Tasks/FilterValueProps.ts";

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
export type FieldError = {
  error: string;
  field: string;
};
export type TodolistsResponse<D = {}> = {
  data: D;
  fieldsErrors: FieldError[];
  messages: string[];
  resultCode: number;
};
export type DomainTodolist = Todolist & {
  filter: FilterValueProps;
};

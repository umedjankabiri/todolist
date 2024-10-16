import { DomainTodolist } from "common/types/Todolists/TodolistsApiProps.ts";
import { DomainTask } from "common/types/Tasks";

export type TodolistTaskProps = {
  todolist: DomainTodolist;
  task: DomainTask;
};

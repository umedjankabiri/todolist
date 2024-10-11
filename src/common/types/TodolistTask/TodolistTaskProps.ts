import { TaskProps } from "common/types/Tasks/TaskProps.ts";
import { TodolistsProps } from "common/types/Todolists/TodolistsProps.ts";

export type TodolistTaskProps = {
  todolist: TodolistsProps;
  task: TaskProps;
};

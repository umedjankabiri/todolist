import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "features/model/reducers/tasksReducer.ts";
import { AddTodolistActionProps, RemoveTodolistActionProps } from "common/types/Todolists/TodolistsActionsProps.ts";

export type RemoveTaskActionProps = ReturnType<typeof removeTaskAC>;
export type AddTaskActionProps = ReturnType<typeof addTaskAC>;
export type SetTasksProps = ReturnType<typeof setTasksAC>;
export type UpdateTasksProps = ReturnType<typeof updateTaskAC>;
export type TasksActionsProps =
  | RemoveTaskActionProps
  | AddTaskActionProps
  | AddTodolistActionProps
  | RemoveTodolistActionProps
  | SetTasksProps
  | UpdateTasksProps;

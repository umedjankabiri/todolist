import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  setTasksAC,
} from "features/model/tasksReducer/tasksReducer";
import {
  AddTodolistActionProps,
  RemoveTodolistActionProps,
} from "common/types/Todolists/TodolistsActions/TodolistsActionsProps.ts";

export type RemoveTaskActionProps = ReturnType<typeof removeTaskAC>;
export type AddTaskActionProps = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusProps = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleProps = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksProps = ReturnType<typeof setTasksAC>;
export type TasksActionsProps =
  | RemoveTaskActionProps
  | AddTaskActionProps
  | ChangeTaskStatusProps
  | ChangeTaskTitleProps
  | AddTodolistActionProps
  | RemoveTodolistActionProps
  | SetTasksProps;

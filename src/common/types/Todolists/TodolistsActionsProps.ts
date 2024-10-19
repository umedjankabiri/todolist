import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from "features/model/reducers/todolistsReducer.ts";

export type RemoveTodolistActionProps = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionProps = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistStatusActionProps = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistTitleActionProps = ReturnType<typeof changeTodolistFilterAC>;
export type SetTodolistsActionProps = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusProps = ReturnType<typeof changeTodolistEntityStatusAC>;
export type TodolistsActionsProps =
  | RemoveTodolistActionProps
  | AddTodolistActionProps
  | ChangeTodolistStatusActionProps
  | ChangeTodolistTitleActionProps
  | SetTodolistsActionProps
  | ChangeTodolistEntityStatusProps;

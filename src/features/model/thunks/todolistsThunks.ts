import { Dispatch } from "@reduxjs/toolkit";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from "features/model/todolistsReducer/todolistsReducer.ts";

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then((response) => {
    dispatch(setTodolistsAC(response.data));
  });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(title).then((response) => {
    dispatch(addTodolistAC(response.data.data.item));
  });
};
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
  todolistsApi.deleteTodolist(id).then(() => {
    dispatch(removeTodolistAC(id));
  });
};
export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: Dispatch) => {
  todolistsApi.updateTodolist(args).then(() => {
    dispatch(changeTodolistTitleAC({ todolistID: args.id, title: args.title }));
  });
};

import { Dispatch } from "@reduxjs/toolkit";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from "features/model/reducers/todolistsReducer.ts";
import { setStatusAC } from "features/model/reducers/statusReducer.ts";

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsApi.getTodolists().then((response) => {
    dispatch(setStatusAC("success"));
    dispatch(setTodolistsAC(response.data));
  });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsApi.createTodolist(title).then((response) => {
    dispatch(setStatusAC("success"));
    dispatch(addTodolistAC(response.data.data.item));
  });
};
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsApi.deleteTodolist(id).then(() => {
    dispatch(setStatusAC("success"));
    dispatch(removeTodolistAC(id));
  });
};
export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  todolistsApi.updateTodolist(args).then(() => {
    dispatch(setStatusAC("success"));
    dispatch(changeTodolistTitleAC({ todolistID: args.id, title: args.title }));
  });
};

import { Dispatch } from "@reduxjs/toolkit";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import { addTodolistAC, setTodolistsAC } from "features/model/todolistsReducer/todolistsReducer.ts";

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

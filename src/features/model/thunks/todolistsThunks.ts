import { Dispatch } from "@reduxjs/toolkit";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import { setTodolistsAC } from "features/model/todolistsReducer/todolistsReducer.ts";

export const fetchTodolistsThunk = (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then((response) => {
    dispatch(setTodolistsAC(response.data));
  });
};

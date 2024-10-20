import { Dispatch } from "@reduxjs/toolkit";
import { setErrorAC, setTodolistStatusAC } from "features/model/reducers/statusReducer.ts";
import { TodolistsResponse } from "common/types/Todolists/TodolistsResponseProps.ts";

export const handleServerError = <T>(data: TodolistsResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else dispatch(setErrorAC("Some error occurred"));
  dispatch(setTodolistStatusAC("failed"));
};

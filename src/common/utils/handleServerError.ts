import { Dispatch } from "@reduxjs/toolkit";
import { setErrorAC, setStatusAC } from "features/model/reducers/statusReducer.ts";
import { TasksResponse } from "common/types/Tasks";

export const handleServerError = <T>(data: TasksResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]));
  } else dispatch(setErrorAC("Some error occurred"));
  dispatch(setStatusAC("failed"));
};

import { Dispatch } from "@reduxjs/toolkit";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from "features/model/reducers/todolistsReducer.ts";
import { setErrorAC, setTodolistStatusAC } from "features/model/reducers/statusReducer.ts";
import { ResultCode } from "common/utils/enums/enumErrorStatus.ts";
import { handleServerError } from "common/utils/handleServerError.ts";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError.ts";

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setTodolistStatusAC("loading"));
  todolistsApi.getTodolists().then((response) => {
    dispatch(setTodolistStatusAC("success"));
    dispatch(setTodolistsAC(response.data));
  });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setTodolistStatusAC("loading"));
  todolistsApi
    .createTodolist(title)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(addTodolistAC(response.data.data.item));
        dispatch(setTodolistStatusAC("success"));
      } else if (response.data.resultCode === ResultCode.ERROR) {
        dispatch(setErrorAC(response.data.messages[0]));
      } else handleServerError(response.data, dispatch);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const deleteTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setTodolistStatusAC("loading"));
  dispatch(changeTodolistEntityStatusAC({ id: id, entityStatus: "loading" }));
  todolistsApi
    .deleteTodolist(id)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(removeTodolistAC(id));
        dispatch(setTodolistStatusAC("success"));
      } else if (response.data.resultCode === ResultCode.ERROR) {
        dispatch(setErrorAC(response.data.messages[0]));
      } else handleServerError(response.data, dispatch);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
      dispatch(changeTodolistEntityStatusAC({ id: id, entityStatus: "idle" }));
    });
};
export const updateTodolistTitleTC = (args: { id: string; title: string }) => (dispatch: Dispatch) => {
  dispatch(setTodolistStatusAC("loading"));
  todolistsApi
    .updateTodolist(args)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(changeTodolistTitleAC({ todolistID: args.id, title: args.title }));
        dispatch(setTodolistStatusAC("success"));
      } else if (response.data.resultCode === ResultCode.ERROR) {
        dispatch(setErrorAC(response.data.messages[0]));
      } else handleServerError(response.data, dispatch);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

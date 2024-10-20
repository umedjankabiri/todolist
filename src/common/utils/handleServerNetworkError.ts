import { Dispatch } from "redux";
import { setErrorAC, setTodolistStatusAC } from "features/model/reducers/statusReducer.ts";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setErrorAC(error.message));
  dispatch(setTodolistStatusAC("failed"));
};

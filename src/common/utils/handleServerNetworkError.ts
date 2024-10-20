import { Dispatch } from "redux";
import { setErrorAC, setStatusAC } from "features/model/reducers/statusReducer.ts";

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setErrorAC(error.message));
  dispatch(setStatusAC("failed"));
};

import { StatusProps } from "common/types/Status/StatusProps.ts";
import { RequestStatusProps } from "common/types/Status/RequestStatusProps.ts";
import { StatusActions } from "common/types/Status/StatusActions.ts";

const initialStatusState: StatusProps = {
  status: "idle",
  error: null,
};

export const statusReducer = (state = initialStatusState, action: StatusActions): StatusProps => {
  switch (action.type) {
    case "SET-TODOLIST-STATUS":
      return {
        ...state,
        status: action.payload.status,
      };
    case "SET-ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const setTodolistStatusAC = (status: RequestStatusProps) =>
  ({ type: "SET-TODOLIST-STATUS", payload: { status: status } }) as const;
export const setErrorAC = (error: null | string) => ({ type: "SET-ERROR", payload: { error: error } }) as const;

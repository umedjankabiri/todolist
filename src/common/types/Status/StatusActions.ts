import { setErrorAC, setTodolistStatusAC } from "features/model/reducers/statusReducer.ts";

type SetStatusAC = ReturnType<typeof setTodolistStatusAC>;
type SetErrorAC = ReturnType<typeof setErrorAC>;

export type StatusActions = SetStatusAC | SetErrorAC;

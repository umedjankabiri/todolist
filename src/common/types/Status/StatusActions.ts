import { setErrorAC, setStatusAC } from "features/model/reducers/statusReducer.ts";

type SetStatusAC = ReturnType<typeof setStatusAC>;
type SetErrorAC = ReturnType<typeof setErrorAC>;

export type StatusActions = SetStatusAC | SetErrorAC;

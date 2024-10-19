import { changeThemeModeAC, initialState } from "features/model/reducers/themeReducer.ts";

export type ThemeMode = "dark" | "light";
export type InitialState = typeof initialState;
export type changeThemeModeActionProps = ReturnType<typeof changeThemeModeAC>;
export type ActionProps = changeThemeModeActionProps;

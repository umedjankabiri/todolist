import { changeThemeModeAC } from "features/model/reducers/themeReducer.ts";

export type ThemeMode = "dark" | "light";
export type InitialStateProps = {
  themeMode: ThemeMode;
};
export type changeThemeModeActionProps = ReturnType<typeof changeThemeModeAC>;
export type ActionProps = changeThemeModeActionProps;

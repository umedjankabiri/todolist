import { ActionProps, InitialState, ThemeMode } from "common/types/ThemeMode/ThemeModeProps.ts";

export const initialState = {
  themeMode: "light" as ThemeMode,
};

export const themeReducer = (state: InitialState = initialState, action: ActionProps) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        themeMode: action.themeMode,
      };
    default:
      return state;
  }
};

export const changeThemeModeAC = (themeMode: ThemeMode) => ({
  type: "CHANGE_THEME",
  themeMode: themeMode,
});

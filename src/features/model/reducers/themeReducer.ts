import { ActionProps, InitialStateProps, ThemeMode } from "common/types/ThemeMode/ThemeModeProps.ts";

const initialState: InitialStateProps = {
  themeMode: "light",
};

export const themeReducer = (state: InitialStateProps = initialState, action: ActionProps): InitialStateProps => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        ...state,
        themeMode: action.payload.themeMode,
      };
    default:
      return state;
  }
};

export const changeThemeModeAC = (themeMode: ThemeMode) =>
  ({ type: "CHANGE_THEME", payload: { themeMode: themeMode } }) as const;

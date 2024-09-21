import {RootState} from "App/store.ts";
import {ThemeMode} from "common/types/ThemeMode/ThemeModeProps.ts";

export const selectThemeMode = (state: RootState): ThemeMode => state.themes.themeMode

import { createTheme } from "@mui/material/styles";
import { ThemeMode } from "common/types/ThemeMode/ThemeModeProps.ts";

export const toggleTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#087EA4",
        light: "#0993cb",
        dark: "#033844",
      },
    },
  });
};

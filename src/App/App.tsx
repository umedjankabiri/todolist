import "App/App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { toggleTheme } from "common/utils/toggleTheme.ts";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectThemeMode } from "common/selectors/themesSelectors.ts";
import { Header, Main } from "common/components";

// Business Logic Layer (BLL)
export const App = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = toggleTheme(themeMode);

  // main layout
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
};

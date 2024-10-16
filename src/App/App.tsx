import "App/App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { toggleTheme } from "common/utils/toggleTheme.ts";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectThemeMode } from "common/selectors/themesSelectors.ts";
import { Header, Main } from "common/components";
import { useEffect } from "react";
import { fetchTodolistsThunk } from "features/model/thunks/todolistsThunks.ts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "App/store.ts";

// Business Logic Layer (BLL)
export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const themeMode = useAppSelector(selectThemeMode);
  const theme = toggleTheme(themeMode);

  useEffect(() => {
    dispatch(fetchTodolistsThunk);
  }, []);

  // main layout
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Main />
    </ThemeProvider>
  );
};

import { RootState } from "App/store.ts";
import { ThemeMode } from "common/types/ThemeMode/ThemeModeProps.ts";
import { changeThemeModeAC } from "features/model/reducers/themeReducer.ts";
import { toggleTheme } from "common/utils/toggleTheme.ts";
import { AppBar, LinearProgress, Switch, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuButton } from "common/components/Header/MenuButtons/MenuButton.tsx";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { StatusProps } from "common/types/Status/StatusProps.ts";
import { selectStatus } from "common/selectors/statusSelector.ts";
import { selectThemeMode } from "common/selectors/themesSelectors.ts";

export const Header = () => {
  const themeMode = useAppSelector<RootState, ThemeMode>(selectThemeMode);
  const { status } = useAppSelector<RootState, StatusProps>(selectStatus);
  const dispatch = useAppDispatch();

  // changing theme of todolist app
  const theme = toggleTheme(themeMode);
  const changeThemeMode = () => dispatch(changeThemeModeAC(themeMode === "light" ? "dark" : "light"));
  const buttonsBackgroundColor = themeMode === "light" ? theme.palette.primary.light : theme.palette.primary.dark;

  // layout
  return (
    <AppBar position={"static"} sx={{ mb: "30px" }}>
      <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1, marginLeft: "10px" }}>
          Todolist App
        </Typography>
        <Typography variant={"h6"}>{themeMode === "light" ? "to dark: " : "to light: "}</Typography>
        <Switch color={"default"} onChange={changeThemeMode} />
        <MenuButton background={buttonsBackgroundColor}>login</MenuButton>
        <MenuButton background={buttonsBackgroundColor}>logout</MenuButton>
        <MenuButton background={buttonsBackgroundColor}>faq</MenuButton>
      </Toolbar>
      {status === "Loading" && <LinearProgress />}
    </AppBar>
  );
};

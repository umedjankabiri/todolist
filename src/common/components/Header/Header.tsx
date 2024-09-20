import {useDispatch, useSelector} from "react-redux";
import {RootState} from "App/store.ts";
import {ThemeMode} from "common/types/ThemeMode/ThemeModeProps.ts";
import {changeThemeModeAC} from "model/themeReducer/themeReducer.ts";
import {toggleTheme} from "common/utils/toggleTheme.ts";
import {AppBar, Switch, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "common/components/MenuButtons/MenuButton.tsx";

export const Header = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.themes?.themeMode)
    const dispatch = useDispatch()

    // changing theme of todolist app
    const theme = toggleTheme(themeMode)
    const changeThemeMode = () => dispatch(changeThemeModeAC(themeMode === "light" ? "dark" : "light"))
    const buttonsBackgroundColor = themeMode === "light" ? theme.palette.primary.light : theme.palette.primary.dark

    // layout
    return (
            <AppBar position={"static"} sx={{mb: "30px"}}>
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="span" sx={{flexGrow: 1, marginLeft: "10px"}}>
                        Todolist App
                    </Typography>
                    <Typography variant={"h6"}>
                        {themeMode === "light" ? "to dark: " : "to light: "}
                    </Typography>
                    <Switch color={"default"} onChange={changeThemeMode}/>
                    <MenuButton background={buttonsBackgroundColor}>login</MenuButton>
                    <MenuButton background={buttonsBackgroundColor}>logout</MenuButton>
                    <MenuButton background={buttonsBackgroundColor}>faq</MenuButton>
                </Toolbar>
            </AppBar>
    )
}
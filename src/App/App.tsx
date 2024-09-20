import 'App/App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "App/store.ts";
import {ThemeMode} from "common/types/ThemeMode/ThemeModeProps.ts";
import {Header} from "common/components/Header/Header.tsx";
import {Main} from "common/components/Main/Main.tsx";
import {toggleTheme} from "common/utils/toggleTheme.ts";

// Business Logic Layer (BLL)
export const App = () => {
    const themeMode = useSelector<RootState, ThemeMode>(state => state.themes?.themeMode)
    const theme = toggleTheme(themeMode)

    // main layout
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    );
}

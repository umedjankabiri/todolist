import 'App/App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {RootState} from "App/store.ts";
import {ThemeMode} from "common/types/ThemeMode/ThemeModeProps.ts";
import {Header} from "common/components/Header/Header.tsx";
import {Main} from "common/components/Main/Main.tsx";
import {toggleTheme} from "common/utils/toggleTheme.ts";
import {useAppSelector} from "common/hooks/useAppSelector.ts";

// Business Logic Layer (BLL)
export const App = () => {
    const themeMode = useAppSelector<RootState, ThemeMode>(state => state.themes?.themeMode)
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

import 'App/App.css'
import {Todolist} from 'common/components/Todolist/Todolist.tsx';
import {useState} from "react";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm.tsx";
import {AppBar, Container, CssBaseline, Paper, Switch, Toolbar, Typography} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"
import Grid from '@mui/material/Grid2'
import {MenuButton} from "common/components/MenuButtons/MenuButton.tsx";
import {ThemeMode} from "common/types/ThemeMode/ThemeModeProps.ts";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "model/todolistsReducer/todolistsReducer.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "model/tasksReducer/tasksReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "App/store.ts";

// Business Logic Layer (BLL)
function App() {
    const todolists = useSelector<RootState, TodolistsProps[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateProps>(state => state.tasks)
    const dispatch = useDispatch()
    const [themeMode, setThemeMode] = useState<ThemeMode>("light")

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: "#087EA4",
                light: "#0993cb",
                dark: "#033844",
            }
        }
    })

    const changeThemeMode = ()=> setThemeMode(themeMode === "light" ? "dark" : "light")
    const removedTask = (todolistID: string, taskID: string) =>
        dispatch(removeTaskAC({todolistID: todolistID, taskID: taskID}));
    const addedTask = (todolistID: string, title: string) =>
        dispatch(addTaskAC({todolistID: todolistID, title: title}));
    const changedTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) =>
        dispatch(changeTaskStatusAC({todolistID: todolistID, taskID: taskID, isDone: taskStatus}));
    const changedTodolistFilter = (todolistID: string, filterValue: FilterValueProps) =>
        dispatch(changeTodolistFilterAC(todolistID, filterValue))

    const removedTodolist = (todolistID: string) => dispatch(removeTodolistAC(todolistID));
    const AddTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }
    const changeTaskTitleHandler = (todolistID: string, taskID: string, title: string) =>
        dispatch(changeTaskTitleAC({todolistID: todolistID, taskID: taskID, title: title}));
    const changeTodolistTitleHandler = (todolistID: string, title: string) =>
        dispatch(changeTodolistTitleAC(todolistID, title))

    const buttonsBackgroundColor = themeMode === "light" ? theme.palette.primary.light : theme.palette.primary.dark

    const filteredTodolists = todolists.map(todolist => {
        let filteredTasks = tasks[todolist.todolistID]
        todolist.filter === "Active" && (filteredTasks = filteredTasks.filter(task => !task.isDone))
        todolist.filter === "Completed" && (filteredTasks = filteredTasks.filter(task => task.isDone))

        return (
            <Grid>
                <Paper sx={{p: "0 20px 20px 20px", boxShadow: `4px 4px 10px 0.5px ${"#504e4e"}`}}>
                    <Todolist
                        key={todolist.todolistID}
                        todolistID={todolist.todolistID}
                        title={todolist.title}
                        tasks={filteredTasks}
                        removeTodolist={removedTodolist}
                        removeTask={removedTask}
                        changeFilter={changedTodolistFilter}
                        addTask={addedTask}
                        changeTaskStatus={changedTaskStatus}
                        filter={todolist.filter}
                        changeTaskTitle={changeTaskTitleHandler}
                        changeTodolistTitle={changeTodolistTitleHandler}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position={"static"} sx={{mb: "30px"}}>
                    <Toolbar>
                        <IconButton color="inherit">
                            <MenuIcon />
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
                <Container fixed>
                    <Grid container sx={{marginBottom: "30px"}}>
                        <Paper sx={{p: "0 20px 20px 20px", boxShadow: `4px 4px 10px 0.5px ${"#504e4e"}`}}>
                            <h3>Create new todolist</h3>
                            <AddItemForm addItem={AddTodolist}/>
                        </Paper>
                    </Grid>
                    <Grid container spacing={4}>
                        {filteredTodolists}
                    </Grid>
                </Container>
            </ThemeProvider>
    );
}

export default App

import 'App/App.css'
import {Todolist} from 'common/components/Todolist/Todolist.tsx';
import {useReducer, useState} from "react";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm.tsx";
import {
    AppBar,
    Container,
    CssBaseline,
    Paper,
    Switch,
    Toolbar,
    Typography
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles"
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"
import Grid from '@mui/material/Grid2'
import {MenuButton} from "common/components/MenuButtons/MenuButton.tsx";
import {ThemeMode} from "common/types/ThemeMode/ThemeModeProps.ts";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "model/todolistsReducer/todolistsReducer.ts";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "model/tasksReducer/tasksReducer.ts";

// Business Logic Layer (BLL)
export let todolistID1 = v1()
export let todolistID2 = v1()
export const todolistsInitialState: TodolistsProps[] = [
    {todolistID: todolistID1, title: "What to read", filter: "All"},
    {todolistID: todolistID2, title: "What to buy", filter: "All"},
]
export const tasksInitialState: TasksStateProps = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'macbook pro 16 M3 MAX', isDone: true},
        {id: v1(), title: 'iphone 15 512 pro MAX', isDone: true},
        {id: v1(), title: 'ipad', isDone: false},
        {id: v1(), title: 'apple watch ultra', isDone: false},
        {id: v1(), title: 'airpods', isDone: false},
    ]
}

function AppWithRedux() {
    const [todolists, dispatchTodolists] = useReducer(todolistsReducer, todolistsInitialState)
    const [tasks, dispatchTasks] = useReducer(tasksReducer, tasksInitialState);
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
        dispatchTasks(removeTaskAC({todolistID: todolistID, taskID: taskID}));
    const addedTask = (todolistID: string, title: string) =>
        dispatchTasks(addTaskAC({todolistID: todolistID, title: title}));
    const changedTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) =>
        dispatchTasks(changeTaskStatusAC({todolistID: todolistID, taskID: taskID, isDone: taskStatus}));
    const changedTodolistFilter = (todolistID: string, filterValue: FilterValueProps) =>
        dispatchTodolists(changeTodolistFilterAC(todolistID, filterValue))

    const removedTodolist = (todolistID: string) => {
        const action = removeTodolistAC(todolistID)
        dispatchTodolists(action);
        dispatchTasks(action)
    }
    const AddTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action);
        dispatchTasks(action)
    }
    const changeTaskTitleHandler = (todolistID: string, taskID: string, title: string) =>
        dispatchTasks(changeTaskTitleAC({todolistID: todolistID, taskID: taskID, title: title}));
    const changeTodolistTitleHandler = (todolistID: string, title: string) =>
        dispatchTodolists(changeTodolistTitleAC(todolistID, title))

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

export default AppWithRedux

import 'common/components/App/App.css'
import {Todolist} from 'common/components/Todolist/Todolist.tsx';
import {useState} from "react";
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

// Business Logic Layer (BLL)
let todolistID1 = v1()
let todolistID2 = v1()
const todolistsInitialState: TodolistsProps[] = [
    {todolistID: todolistID1, title: "What to read", filter: "All"},
    {todolistID: todolistID2, title: "What to buy", filter: "All"},
]
const initialState: TasksStateProps = {
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

function App() {
    const [todolists, setTodolists] = useState(todolistsInitialState)
    const [tasks, setTasks] = useState(initialState);
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
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)});
    const addedTask = (todolistID: string, title: string) =>
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]});
    const changedTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) =>
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(task =>
                task.id === taskID ? {...task, isDone: taskStatus} : task)
        });
    const changedFilter = (todolistID: string, filterValue: FilterValueProps) =>
        setTodolists(todolists.map(todolist =>
            todolist.todolistID === todolistID ? {...todolist, filter: filterValue} : todolist))
    const removedTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.todolistID !== todolistID))
        delete tasks[todolistID];
    }
    const AddTodolist = (title: string) => {
        const newTodolistID = v1()
        setTodolists([{todolistID: newTodolistID, title: title, filter: "All"}, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []})
    }
    const changeTaskTitleHandler = (todolistID: string, taskID: string, title: string) =>
        setTasks({
            ...tasks, [todolistID]: tasks[todolistID].map(task =>
                task.id === taskID ? {...task, title: title} : task)
        });
    const changeTodolistTitleHandler = (todolistID: string, title: string) =>
        setTodolists(todolists.map(todolist =>
            todolist.todolistID === todolistID ? {...todolist, title: title} : todolist))

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
                        changeFilter={changedFilter}
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

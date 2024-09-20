import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {Todolist} from "common/components/Todolists/Todolist/Todolist.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "App/store.ts";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "model/todolistsReducer/todolistsReducer.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "model/tasksReducer/tasksReducer.ts";

export const Todolists = () => {
    const todolists = useSelector<RootState, TodolistsProps[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateProps>(state => state.tasks)
    const dispatch = useDispatch()

    // CRUD for todolists
    const removedTodolist = (todolistID: string) => dispatch(removeTodolistAC(todolistID));
    const changeTodolistTitle = (todolistID: string, title: string) =>
        dispatch(changeTodolistTitleAC({todolistID: todolistID, title: title}))
    const changedTodolistFilter = (todolistID: string, filterValue: FilterValueProps) =>
        dispatch(changeTodolistFilterAC({todolistID: todolistID, filter: filterValue}))

    // CRUD for tasks
    const removedTask = (todolistID: string, taskID: string) =>
        dispatch(removeTaskAC({todolistID: todolistID, taskID: taskID}));
    const addedTask = (todolistID: string, title: string) =>
        dispatch(addTaskAC({todolistID: todolistID, title: title}));
    const changedTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) =>
        dispatch(changeTaskStatusAC({todolistID: todolistID, taskID: taskID, isDone: taskStatus}));
    const changeTaskTitle = (todolistID: string, taskID: string, title: string) =>
        dispatch(changeTaskTitleAC({todolistID: todolistID, taskID: taskID, title: title}));

    // mapped todolists for render
    const filteredTodolists = todolists.map(todolist => {
        let filteredTasks = tasks[todolist.todolistID]
        todolist.filter === "Active" && (filteredTasks = filteredTasks.filter(task => !task.isDone))
        todolist.filter === "Completed" && (filteredTasks = filteredTasks.filter(task => task.isDone))

        // layout of todolists
        return (
            <Grid key={todolist.todolistID}>
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
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    // layout
    return (
        <Grid container spacing={4}>
            {filteredTodolists}
        </Grid>
    )
}
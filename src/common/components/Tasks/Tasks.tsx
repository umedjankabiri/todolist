import {ChangeEvent, FC} from "react";
import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {RootState} from "App/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "model/tasksReducer/tasksReducer.ts";
import {Checkbox, List, ListItem} from "@mui/material";
import {getListItemSx} from "common/components/EditableSpan/EditableSpan.styles.ts";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const Tasks: FC<TodolistProps> = ({todolist}) => {
    const tasks = useSelector<RootState, TasksStateProps>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTaskHandler = (todolistID: string, taskID: string) =>
        dispatch(removeTaskAC({todolistID: todolistID, taskID: taskID}))
    const changeTaskStatusHandler = (todolistID: string, taskID: string, status: boolean) =>
        dispatch(changeTaskStatusAC({todolistID: todolistID, taskID: taskID, isDone: status}))
    const changeTaskTitleHandler = (todolistID: string, taskID: string, title: string) =>
        dispatch(changeTaskTitleAC({todolistID: todolistID, taskID: taskID, title: title}))

    let todolistTasks = tasks[todolist.todolistID]

    todolist.filter === "Active" ? todolistTasks = todolistTasks.filter(task => !task.isDone) : todolistTasks
    todolist.filter === "Completed" ? todolistTasks = todolistTasks.filter(task => task.isDone) : todolistTasks

    const mappedTasks = todolistTasks.map(task => {
        const onClickRemoveTask = () => removeTaskHandler(todolist.todolistID, task.id)
        const onChangeTaskStatus = (event: ChangeEvent<HTMLInputElement>) =>
            changeTaskStatusHandler(todolist.todolistID, task.id, event.currentTarget.checked)
        const onChangeTaskTitle = (title: string) =>
            changeTaskTitleHandler(todolist.todolistID, task.id, title)

        return (
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                    <Checkbox checked={task.isDone} onChange={onChangeTaskStatus}/>
                    <EditableSpan title={task.title} onChangeTitle={onChangeTaskTitle}/>
                </div>
                <IconButton onClick={onClickRemoveTask}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        )
    })

    return (
        <List>
            {todolistTasks.length > 0 ? mappedTasks :
                <span style={{fontSize: 20, fontWeight: "bold"}}>No tasks</span>}
        </List>
    );
};

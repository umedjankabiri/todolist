import {ChangeEvent, FC} from "react";
import {useDispatch} from "react-redux";
import {TodolistTaskProps} from "common/types/TodolistTask/TodolistTaskProps.ts";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "model/tasksReducer/tasksReducer.ts";
import {Checkbox, ListItem} from "@mui/material";
import {getListItemSx} from "common/components/EditableSpan/EditableSpan.styles.ts";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export const Task: FC<TodolistTaskProps> = ({todolist, task}) => {
    const dispatch = useDispatch()

    const {todolistID} = todolist
    const {taskID} = task

    const removeTaskHandler = () =>
        dispatch(removeTaskAC({todolistID: todolistID, taskID: taskID}))
    const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC({todolistID: todolistID, taskID: taskID, isDone: event.currentTarget.checked}))
    const changeTaskTitleHandler = (title: string) =>
        dispatch(changeTaskTitleAC({todolistID: todolistID, taskID: taskID, title: title}))

    return (
        <>
            <ListItem key={task.taskID} sx={getListItemSx(task.isDone)}>
                <div>
                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                    <EditableSpan title={task.title} onChangeTitle={changeTaskTitleHandler}/>
                </div>
                <IconButton onClick={removeTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        </>
    );
};

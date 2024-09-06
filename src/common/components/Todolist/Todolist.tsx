import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";
import {ChangeEvent, FC} from "react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm.tsx";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {Box, Checkbox, List, ListItem} from "@mui/material";
import {filterButtonsContainerSX} from "common/types/Todolist/Todolist.styles.ts";
import {getListItemSx} from "common/components/EditableSpan/EditableSpan.styles.ts";

export const Todolist: FC<TodolistProps> = (props) => {
    const addTaskHandler = (title: string) =>
        props.addTask(props.todolistID, title)

    const onClickRemoveTodolist = () => props.removeTodolist(props.todolistID)
    const onClickAllHandler = () => props.changeFilter(props.todolistID, "All")
    const onClickActiveHandler = () => props.changeFilter(props.todolistID, "Active")
    const onClickCompletedHandler = () => props.changeFilter(props.todolistID, "Completed")
    const changeTaskTitleHandler = (taskID: string, title: string) => props.changeTaskTitle(props.todolistID, taskID, title)
    const changeTodolistHandler = (title: string) => props.changeTodolistTitle(props.todolistID, title)

    const mappedTasks = props.tasks.map(task => {
        const onClickRemoveTaskHandler = () => props.removeTask(props.todolistID, task.id)
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(props.todolistID, task.id, event.currentTarget.checked)

        return (
            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan title={task.title}
                              onChangeTitle={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}
                />
                </div>
                <IconButton onClick={onClickRemoveTaskHandler}>
                    <DeleteIcon/>
                </IconButton>
            </ListItem>
        )
    })

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan title={props.title} onChangeTitle={changeTodolistHandler}/>
                </h3>
                <IconButton onClick={onClickRemoveTodolist}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            <List>
                {props.tasks.length > 0 ? mappedTasks : <span>No tasks</span>}
            </List>
            <Box sx={filterButtonsContainerSX}>
                <Button
                    variant={props.filter === "All" ? "outlined" : "text"}
                    color={"inherit"}
                    onClick={onClickAllHandler}
                >All</Button>
                <Button
                    className={props.filter === "Active" ? "outlined" : "text"}
                    color={"inherit"}
                    onClick={onClickActiveHandler}
                >Active</Button>
                <Button
                    className={props.filter === "Completed" ? "outlined" : "text"}
                    color={"inherit"}
                    onClick={onClickCompletedHandler}
                >Completed</Button>
            </Box>
        </div>
    );
};

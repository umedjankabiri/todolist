import {FC} from "react";
import {TodolistProps} from "common/types/Todolists/Todolist/TodolistProps.ts";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeTodolistTitleAC, removeTodolistAC} from "model/todolistsReducer/todolistsReducer.ts";

export const TodolistTitle: FC<TodolistProps> = ({todolist}) => {
    const dispatch = useDispatch();

    const {todolistID, title} = todolist
    const removeTodolistHandler = () => dispatch(removeTodolistAC(todolistID))
    const changeTodolistTitleHandler = (title: string) =>
        dispatch(changeTodolistTitleAC({todolistID: todolistID, title: title}))

    return (
        <div className={"todolist-title-container"}>
            <h3>
                <EditableSpan title={title} onChangeTitle={changeTodolistTitleHandler}/>
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};

import {FC} from "react";
import {Box} from "@mui/material";
import {filterButtonsContainerSX} from "common/types/Todolists/Todolist/Todolist.styles.ts";
import Button from "@mui/material/Button";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC} from "model/todolistsReducer/todolistsReducer.ts";
import {TodolistProps} from "common/types/Todolists/Todolist/TodolistProps.ts";

export const FilterButtons: FC<TodolistProps> = ({todolist}) => {
    const dispatch = useDispatch()

    const {todolistID, filter} = todolist
    const changeFilterHandler = (filter: FilterValueProps) =>
        dispatch(changeTodolistFilterAC({todolistID: todolistID, filter: filter}))

    return (
        <Box sx={filterButtonsContainerSX}>
            <Button
                variant={filter === "All" ? "outlined" : "text"}
                color={"inherit"}
                onClick={() => changeFilterHandler("All")}
            >All</Button>
            <Button
                variant={filter === "Active" ? "outlined" : "text"}
                color={"inherit"}
                onClick={() => changeFilterHandler("Active")}
            >Active</Button>
            <Button
                variant={filter === "Completed" ? "outlined" : "text"}
                color={"inherit"}
                onClick={() => changeFilterHandler("Completed")}
            >Completed</Button>
        </Box>
    );
};

import { FC } from "react";
import { Box } from "@mui/material";
import { filterButtonsContainerSX } from "features/ui/Todolists/Todolist/FilterButtons/FilterButtons.styles.ts";
import Button from "@mui/material/Button";
import { FilterValueProps } from "common/types/Tasks/FilterValueProps.ts";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { changeTodolistFilterAC } from "features/model/todolistsReducer/todolistsReducer.ts";
import { TodolistProps } from "common/types/Todolists/Todolist/TodolistProps.ts";

export const FilterButtons: FC<TodolistProps> = ({ todolist }) => {
  const dispatch = useAppDispatch();

  const { todolistID, filter } = todolist;
  const changeFilterHandler = (filter: FilterValueProps) =>
    dispatch(changeTodolistFilterAC({ todolistID: todolistID, filter: filter }));

  return (
    <Box sx={filterButtonsContainerSX}>
      <Button
        variant={filter === "All" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterHandler("All")}
      >
        All
      </Button>
      <Button
        variant={filter === "Active" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterHandler("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilterHandler("Completed")}
      >
        Completed
      </Button>
    </Box>
  );
};

import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";
import { Todolist } from "features/ui/Todolists/Todolist/Todolist.tsx";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectTodolists } from "common/selectors/TodolistsSelectors.ts";
import { useEffect } from "react";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import { useAppDispatch } from "common";
import { setTodolistsAC } from "features/model/reducers/todolistsReducer.ts";

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    todolistsApi.getTodolists().then((response) => {
      dispatch(setTodolistsAC(response.data));
    });
  }, []);

  // mapped todolists for render
  const filteredTodolists = todolists.map((todolist) => {
    // layout of todolists
    return (
      <Grid key={todolist.id}>
        <Paper
          sx={{
            p: "0 20px 20px 20px",
            boxShadow: `4px 4px 10px 0.5px ${"#504e4e"}`,
          }}
        >
          <Todolist key={todolist.id} todolist={todolist} />
        </Paper>
      </Grid>
    );
  });

  // layout
  return (
    <Grid container spacing={4}>
      {filteredTodolists}
    </Grid>
  );
};

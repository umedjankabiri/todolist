import { addTodolistAC } from "features/model/todolistsReducer/todolistsReducer.ts";
import Grid from "@mui/material/Grid2";
import { Container, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm.tsx";
import { Todolists } from "features/ui/Todolists/Todolists.tsx";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";

export const Main = () => {
  const dispatch = useAppDispatch();
  const AddTodolist = (title: string) => dispatch(addTodolistAC(title));

  // layout
  return (
    <Container fixed>
      <Grid container sx={{ marginBottom: "30px" }}>
        <Paper
          sx={{
            p: "0 20px 20px 20px",
            boxShadow: `4px 4px 10px 0.5px ${"#504e4e"}`,
          }}
        >
          <h3>Create new todolist</h3>
          <AddItemForm addItem={AddTodolist} />
        </Paper>
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};

import Grid from "@mui/material/Grid2";
import {Paper} from "@mui/material";
import {Todolist} from "features/ui/Todolists/Todolist/Todolist.tsx";
import {useAppSelector} from "common/hooks/useAppSelector.ts";
import {selectTodolists} from "common/selectors/TodolistsSelectors.ts";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    // mapped todolists for render
    const filteredTodolists = todolists.map(todolist => {

        // layout of todolists
        return (
            <Grid key={todolist.todolistID}>
                <Paper sx={{p: "0 20px 20px 20px", boxShadow: `4px 4px 10px 0.5px ${"#504e4e"}`}}>
                    <Todolist
                        key={todolist.todolistID}
                        todolist={todolist}
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

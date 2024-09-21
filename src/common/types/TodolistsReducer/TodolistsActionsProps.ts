import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "features/model/todolistsReducer/todolistsReducer.ts";

export type RemoveTodolistActionProps = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionProps = ReturnType<typeof addTodolistAC>
export type ChangeTodolistStatusActionProps = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistTitleActionProps = ReturnType<typeof changeTodolistFilterAC>
export type TodolistsActionsProps = RemoveTodolistActionProps
    | AddTodolistActionProps
    | ChangeTodolistStatusActionProps
    | ChangeTodolistTitleActionProps

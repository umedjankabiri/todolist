import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";

export type TodolistsActionsProps = RemoveTodolistActionProps
    | AddTodolistActionProps
    | ChangeTodolistTitleActionProps
    | ChangeTodolistFilterActionProps
export type RemoveTodolistActionProps = {
    type: "REMOVE-TODOLIST"
    payload: {
        todolistID: string
    }
}
export type AddTodolistActionProps = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
    }
}
export type ChangeTodolistTitleActionProps = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        todolistID: string
        title: string
    }
}
export type ChangeTodolistFilterActionProps = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        todolistID: string
        filter: FilterValueProps
    }
}

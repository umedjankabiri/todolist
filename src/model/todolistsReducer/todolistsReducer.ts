import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {TodolistsActionsProps} from "common/types/TodolistsReducer/TodolistsActionsProps.ts";

const initialTodolistsState: TodolistsProps[] = []

export const todolistsReducer = (state: TodolistsProps[] = initialTodolistsState, action: TodolistsActionsProps) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.todolistID !== action.payload.todolistID)
        case "ADD-TODOLIST": {
            const newTodolist: TodolistsProps = {
                todolistID: action.payload.todolistID,
                title: action.payload.title,
                filter: "All"
            }
            return [newTodolist, ...state];
        }
        case "CHANGE-TODOLIST-TITLE":
            return state.map(todolist => todolist.todolistID === action.payload.todolistID
                ? {...todolist, title: action.payload.title}
                : todolist
            )
        case "CHANGE-TODOLIST-FILTER":
            return state.map(todolist => todolist.todolistID === action.payload.todolistID
                ? {...todolist, filter: action.payload.filter}
                : todolist
            )
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistID: string) =>
    ({type: "REMOVE-TODOLIST", payload: {todolistID: todolistID}}) as const
export const addTodolistAC = (title: string) =>
    ({type: "ADD-TODOLIST", payload: {title: title, todolistID: v1()}}) as const
export const changeTodolistTitleAC = (todolistID: string, title: string) =>
    ({type: "CHANGE-TODOLIST-TITLE", payload: {todolistID: todolistID, title: title}}) as const
export const changeTodolistFilterAC = (todolistID: string, filter: FilterValueProps) =>
    ({type: "CHANGE-TODOLIST-FILTER", payload: {todolistID: todolistID, filter: filter}}) as const

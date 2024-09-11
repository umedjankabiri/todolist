import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {TodolistsActionsProps} from "common/types/TodolistsReducer/TodolistsActionsProps.ts";

// Business Logic Layer (BLL)
let todolistID1 = v1()
let todolistID2 = v1()
const initialState: TodolistsProps[] = [
    {todolistID: todolistID1, title: "What to read", filter: "All"},
    {todolistID: todolistID2, title: "What to buy", filter: "All"},
]

export const todolistsReducer = (state: TodolistsProps[] = initialState, action: TodolistsActionsProps) => {
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
            throw new Error(`Unknown action type ${(action as { type: string }).type}`);
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

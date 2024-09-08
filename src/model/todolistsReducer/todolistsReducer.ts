import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {
    AddTodolistActionProps, ChangeTodolistFilterActionProps,
    ChangeTodolistTitleActionProps,
    RemoveTodolistActionProps,
    TodolistsActionsProps
} from "model/reducersTypes/TodolistsReducer/TodolistsActionsProps.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";

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
                todolistID: v1(),
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
            throw new Error("Unknown action type")
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionProps =>
    ({type: "REMOVE-TODOLIST", payload: {todolistID: todolistID}}) as const
export const AddTodolistAC = (title: string): AddTodolistActionProps =>
    ({type: "ADD-TODOLIST", payload: {title: title}}) as const
export const ChangeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionProps =>
    ({type: "CHANGE-TODOLIST-TITLE", payload: {todolistID: todolistID, title: title}}) as const
export const ChangeTodolistFilterAC = (todolistID: string, filter: FilterValueProps): ChangeTodolistFilterActionProps =>
    ({type: "CHANGE-TODOLIST-FILTER", payload: {todolistID: todolistID, filter: filter}}) as const

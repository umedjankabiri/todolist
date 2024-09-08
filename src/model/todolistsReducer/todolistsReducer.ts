import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {ActionsProps} from "model/reducersTypes/TodolistsReducer/ActionsProps.ts";

// Business Logic Layer (BLL)
let todolistID1 = v1()
let todolistID2 = v1()
const initialState: TodolistsProps[] = [
    {todolistID: todolistID1, title: "What to read", filter: "All"},
    {todolistID: todolistID2, title: "What to buy", filter: "All"},
]

export const todolistsReducer = (state: TodolistsProps[] = initialState, action: ActionsProps) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.todolistID !== action.payload.todolistID)
        case "ADD-TODOLIST":
            return {
                ...state,
                title: action.payload.title
            }
        default:
            throw new Error("Unknown action type " + action.type)
    }
}

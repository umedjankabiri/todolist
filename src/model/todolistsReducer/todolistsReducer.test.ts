import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {todolistsReducer} from "model/todolistsReducer/todolistsReducer.ts";

test("Correct todolist should be removed", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const initialState: TodolistsProps[] = [
        {todolistID: todolistID1, title: "What to read", filter: "All"},
        {todolistID: todolistID2, title: "What to buy", filter: "All"},
    ]

    const action = {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID: todolistID1,
        }
    } as const
    const endState: TodolistsProps[] = todolistsReducer(initialState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].todolistID).toBe(todolistID2);
})


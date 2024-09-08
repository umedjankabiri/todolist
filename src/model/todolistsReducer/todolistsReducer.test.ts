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
test("Correct todolist should be added", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const initialState: TodolistsProps[] = [
        {todolistID: todolistID1, title: "What to read", filter: "All"},
        {todolistID: todolistID2, title: "What to buy", filter: "All"},
    ]

    const action = {
        type: "ADD-TODOLIST",
        payload: {
            title: "What to learn",
        }
    } as const
    const endState: TodolistsProps[] = todolistsReducer(initialState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(action.payload.title);
})
test("Correct todolist should be changed it's title", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const initialState: TodolistsProps[] = [
        {todolistID: todolistID1, title: "What to read", filter: "All"},
        {todolistID: todolistID2, title: "What to buy", filter: "All"},
    ]

    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistID: todolistID2,
            title: "What to learn",
        }
    } as const
    const endState: TodolistsProps[] = todolistsReducer(initialState, action);

    expect(endState[0].title).toBe("What to read");
    expect(endState[1].title).toBe(action.payload.title);
})
test("Correct filter of todolist should be changed", ()=> {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const initialState: TodolistsProps[] = [
        {todolistID: todolistID1, title: "What to read", filter: "All"},
        {todolistID: todolistID2, title: "What to buy", filter: "All"},
    ]

    const action = {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistID: todolistID2,
            filter: "Completed",
        }
    } as const
    const endState: TodolistsProps[] = todolistsReducer(initialState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(action.payload.filter);
})

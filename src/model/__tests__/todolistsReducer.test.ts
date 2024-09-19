import {v1} from "uuid";
import {TodolistsProps} from "common/types/Todolists/TodolistsProps.ts";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "model/todolistsReducer/todolistsReducer.ts";

let todolistID1: string
let todolistID2: string
let initialState: TodolistsProps[]

beforeEach(() => {
    todolistID1 = v1()
    todolistID2 = v1()
    initialState = [
        {todolistID: todolistID1, title: "What to read", filter: "All"},
        {todolistID: todolistID2, title: "What to buy", filter: "All"},
    ]
})

test("Correct todolist should be removed", () => {
    const endState: TodolistsProps[] = todolistsReducer(initialState, removeTodolistAC(todolistID1));

    expect(endState.length).toBe(1);
    expect(endState[0].todolistID).toBe(todolistID2);
})
test("Correct todolist should be added", () => {
    const newTitle = "What to learn"
    const endState: TodolistsProps[] = todolistsReducer(initialState, addTodolistAC(newTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
})
test("Correct todolist should be changed it's title", () => {
    const endState: TodolistsProps[] = todolistsReducer(initialState, changeTodolistTitleAC({
        todolistID: todolistID2,
        title: "What to learn"
    }));

    expect(endState[0].title).toBe("What to read");
    expect(endState[1].title).toBe("What to learn");
})
test("Correct filter of todolist should be changed", () => {
    const endState: TodolistsProps[] = todolistsReducer(initialState, changeTodolistFilterAC({
        todolistID: todolistID2,
        filter: "Completed"
    }));

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe("Completed");
})

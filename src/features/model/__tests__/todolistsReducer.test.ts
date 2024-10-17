import { v1 } from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "features/model/todolistsReducer/todolistsReducer.ts";
import { DomainTodolist, Todolist } from "common/types/Todolists/TodolistsApiProps.ts";

let todolistID1: string;
let todolistID2: string;
let initialState: DomainTodolist[];

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  initialState = [
    { id: todolistID1, title: "What to read", filter: "All", addedDate: new Date().toISOString(), order: 0 },
    { id: todolistID2, title: "What to buy", filter: "All", addedDate: new Date().toISOString(), order: 0 },
  ];
});

test("Correct todolist should be removed", () => {
  const endState: DomainTodolist[] = todolistsReducer(initialState, removeTodolistAC(todolistID1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistID2);
});
test("Correct todolist should be added", () => {
  const newTitle = "What to learn";
  const todolist: Todolist = {
    id: todolistID1,
    title: newTitle,
    addedDate: new Date().toISOString(),
    order: 0,
  };
  const endState: DomainTodolist[] = todolistsReducer(initialState, addTodolistAC(todolist));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
});
test("Correct todolist should be changed it's title", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    initialState,
    changeTodolistTitleAC({
      todolistID: todolistID2,
      title: "What to learn",
    })
  );

  expect(endState[0].title).toBe("What to read");
  expect(endState[1].title).toBe("What to learn");
});
test("Correct filter of todolist should be changed", () => {
  const endState: DomainTodolist[] = todolistsReducer(
    initialState,
    changeTodolistFilterAC({
      todolistID: todolistID2,
      filter: "Completed",
    })
  );

  expect(endState[0].filter).toBe("All");
  expect(endState[1].filter).toBe("Completed");
});

import { TasksStateProps } from "common/types/Tasks/TasksStateProps.ts";
import { addTodolistAC, todolistsReducer } from "features/model/todolistsReducer/todolistsReducer.ts";
import { tasksReducer } from "features/model/tasksReducer/tasksReducer.ts";
import { DomainTodolist } from "common/types/Todolists/TodolistsApiProps.ts";
import { v1 } from "uuid";

test("ids should be equals", () => {
  const startTasksState: TasksStateProps = {};
  const startTodolistsState: DomainTodolist[] = [];

  const action = addTodolistAC({
    id: v1(),
    title: "What to read",
    addedDate: new Date().toISOString(),
    order: 0,
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

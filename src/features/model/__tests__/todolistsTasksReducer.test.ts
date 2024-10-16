import { TasksStateProps } from "common/types/Tasks/TasksStateProps.ts";
import { addTodolistAC, todolistsReducer } from "features/model/todolistsReducer/todolistsReducer.ts";
import { tasksReducer } from "features/model/tasksReducer/tasksReducer.ts";
import { DomainTodolist } from "common/types/Todolists/TodolistsApiProps.ts";

test("ids should be equals", () => {
  const startTasksState: TasksStateProps = {};
  const startTodolistsState: DomainTodolist[] = [];

  const action = addTodolistAC("What to read");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.id);
  expect(idFromTodolists).toBe(action.payload.id);
});

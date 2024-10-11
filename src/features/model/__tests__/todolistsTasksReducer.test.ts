import { TasksStateProps } from "common/types/Tasks/TasksStateProps.ts";
import { TodolistsProps } from "common/types/Todolists/TodolistsProps.ts";
import { addTodolistAC, todolistsReducer } from "features/model/todolistsReducer/todolistsReducer.ts";
import { tasksReducer } from "features/model/tasksReducer/tasksReducer.ts";

test("ids should be equals", () => {
  const startTasksState: TasksStateProps = {};
  const startTodolistsState: TodolistsProps[] = [];

  const action = addTodolistAC("What to read");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].todolistID;

  expect(idFromTasks).toBe(action.payload.todolistID);
  expect(idFromTodolists).toBe(action.payload.todolistID);
});

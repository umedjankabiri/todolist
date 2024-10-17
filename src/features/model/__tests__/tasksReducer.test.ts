import { TasksStateProps } from "common/types/Tasks/TasksStateProps.ts";
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from "features/model/tasksReducer/tasksReducer.ts";
import { addTodolistAC, removeTodolistAC } from "features/model/todolistsReducer/todolistsReducer.ts";
import { v1 } from "uuid";
import { DomainTask } from "common/types/Tasks";
import { TaskStatus } from "common/utils/enums/enumTaskStatus";
import { TaskPriority } from "common/utils/enums/enumTaskPriority";
import { Todolist } from "common/types/Todolists/TodolistsApiProps.ts";

let todolistID1: string;
let todolistID2: string;
let initialState: TasksStateProps;

beforeEach(() => {
  todolistID1 = v1();
  todolistID2 = v1();
  initialState = {
    [todolistID1]: [
      {
        todoListId: todolistID1,
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID1,
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID1,
        id: "3",
        title: "React",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
    ],
    [todolistID2]: [
      {
        todoListId: todolistID2,
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID2,
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID2,
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(initialState, removeTaskAC({ todolistId: todolistID2, taskId: "2" }));

  expect(endState).toEqual({
    [todolistID1]: [
      {
        todoListId: todolistID1,
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID1,
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID1,
        id: "3",
        title: "React",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
    ],
    [todolistID2]: [
      {
        todoListId: todolistID2,
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
      {
        todoListId: todolistID2,
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        priority: TaskPriority.Low,
        description: "",
        deadline: "",
        startDate: "",
        addedDate: "",
        order: 0,
      },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const task: DomainTask = {
    todoListId: todolistID2,
    id: v1(),
    title: "juice",
    status: TaskStatus.New,
    priority: TaskPriority.Low,
    description: "",
    deadline: "",
    startDate: "",
    addedDate: "",
    order: 0,
  };
  const endState = tasksReducer(initialState, addTaskAC({ task: task }));

  expect(endState[todolistID1].length).toBe(3);
  expect(endState[todolistID2].length).toBe(4);
  expect(endState[todolistID2][0].id).toBeDefined();
  expect(endState[todolistID2][0].title).toBe("juice");
});
test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    initialState,
    updateTaskAC({ todolistId: todolistID2, taskId: "2", domainModel: { status: TaskStatus.New } })
  );

  expect(endState[todolistID1][1].status).toBeTruthy();
  expect(endState[todolistID2][1].status).toBeFalsy();
});
test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    initialState,
    updateTaskAC({ todolistId: todolistID2, taskId: "2", domainModel: { title: "coffee" } })
  );

  expect(endState[todolistID1][1].title).toBe("JS");
  expect(endState[todolistID2][1].title).toBe("coffee");
});
test("new array should be added when new todolist is added", () => {
  const title: string = "What to read";
  const todolist: Todolist = {
    id: v1(),
    title: title,
    addedDate: new Date().toISOString(),
    order: 0,
  };
  const endState = tasksReducer(initialState, addTodolistAC(todolist));

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== todolistID1 && k !== todolistID2);
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test("property with todolistID should be deleted", () => {
  const action = removeTodolistAC(todolistID2);

  const endState = tasksReducer(initialState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState[todolistID2]).not.toBeDefined();
  // or
  expect(endState[todolistID2]).toBeUndefined();
});

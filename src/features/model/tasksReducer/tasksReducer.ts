import { TasksStateProps } from "common/types/Tasks/TasksStateProps.ts";
import { TasksActionsProps } from "common/types/taskReducer/TasksActionsProps.ts";
import { v1 } from "uuid";
import { DomainTask } from "common/types/Tasks";
import { TaskPriority, TaskStatus } from "common";

const initialTasksState: TasksStateProps = {};

export const tasksReducer = (
  state: TasksStateProps = initialTasksState,
  action: TasksActionsProps
): TasksStateProps => {
  switch (action.type) {
    case "SET-TASKS":
      return {
        ...state,
        [action.payload.todolistID]: action.payload.tasks,
      };
    case "REMOVE-TASK": {
      const { todolistID, taskID } = action.payload;
      return {
        ...state,
        [todolistID]: state[todolistID].filter((task) => task.id !== taskID),
      };
    }
    case "ADD-TASK": {
      const { todolistID, title } = action.payload;
      return {
        ...state,
        [todolistID]: [
          {
            todoListId: todolistID,
            id: v1(),
            title: title,
            status: TaskStatus.New,
            priority: TaskPriority.Low,
            description: "",
            deadline: "",
            startDate: "",
            addedDate: "",
            order: 0,
          },
          ...state[todolistID],
        ],
      };
    }
    case "CHANGE-TASK-STATUS": {
      const { todolistID, taskID, status } = action.payload;
      return {
        ...state,
        [todolistID]: state[todolistID].map((task) => (task.id === taskID ? { ...task, status: status } : task)),
      };
    }
    case "CHANGE-TASK-TITLE": {
      const { todolistID, taskID, title } = action.payload;
      return {
        ...state,
        [todolistID]: state[todolistID].map((task) => (task.id === taskID ? { ...task, title: title } : task)),
      };
    }
    case "ADD-TODOLIST": {
      return { [action.payload.id]: [], ...state };
    }
    case "REMOVE-TODOLIST": {
      // const copyState = {...state};
      // delete copyState[action.payload.todolistID];
      // return copyState
      const { [action.payload.todolistID]: removedTodolist, ...restState } = state;
      return restState;
    }
    default:
      return state;
  }
};

export const setTasksAC = (payload: { todolistID: string; tasks: DomainTask[] }) =>
  ({ type: "SET-TASKS", payload }) as const;
export const removeTaskAC = (payload: { todolistID: string; taskID: string }) =>
  ({ type: "REMOVE-TASK", payload }) as const;
export const addTaskAC = (payload: { todolistID: string; title: string }) => ({ type: "ADD-TASK", payload }) as const;
export const changeTaskStatusAC = (payload: { todolistID: string; taskID: string; status: TaskStatus }) =>
  ({ type: "CHANGE-TASK-STATUS", payload }) as const;
export const changeTaskTitleAC = (payload: { todolistID: string; taskID: string; title: string }) =>
  ({ type: "CHANGE-TASK-TITLE", payload }) as const;

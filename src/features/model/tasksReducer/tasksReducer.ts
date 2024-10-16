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
        [action.payload.todolistId]: action.payload.tasks,
      };
    case "REMOVE-TASK": {
      const { todolistId, taskId } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].filter((task) => task.id !== taskId),
      };
    }
    case "ADD-TASK": {
      const { todolistId, title } = action.payload;
      return {
        ...state,
        [todolistId]: [
          {
            todoListId: todolistId,
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
          ...state[todolistId],
        ],
      };
    }
    case "CHANGE-TASK-STATUS": {
      const { todolistId, taskId, status } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, status: status } : task)),
      };
    }
    case "CHANGE-TASK-TITLE": {
      const { todolistId, taskId, title } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, title: title } : task)),
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

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) =>
  ({ type: "SET-TASKS", payload }) as const;
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) =>
  ({ type: "REMOVE-TASK", payload }) as const;
export const addTaskAC = (payload: { todolistId: string; title: string }) => ({ type: "ADD-TASK", payload }) as const;
export const changeTaskStatusAC = (payload: { todolistId: string; taskId: string; status: TaskStatus }) =>
  ({ type: "CHANGE-TASK-STATUS", payload }) as const;
export const changeTaskTitleAC = (payload: { todolistId: string; taskId: string; title: string }) =>
  ({ type: "CHANGE-TASK-TITLE", payload }) as const;

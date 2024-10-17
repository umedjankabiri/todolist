import { TasksStateProps } from "common/types/Tasks/TasksStateProps.ts";
import { TasksActionsProps } from "common/types/taskReducer/TasksActionsProps.ts";
import { DomainTask, UpdateTaskDomainModel } from "common/types/Tasks";

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
      const { task } = action.payload;
      return {
        ...state,
        [task.todoListId]: [task, ...state[task.todoListId]],
      };
    }
    case "UPDATE-TASK": {
      const { todolistId, taskId, domainModel } = action.payload;
      return {
        ...state,
        [todolistId]: state[todolistId].map((task) => (task.id === taskId ? { ...task, ...domainModel } : task)),
      };
    }
    case "ADD-TODOLIST": {
      return { [action.payload.todolist.id]: [], ...state };
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
export const addTaskAC = (payload: { task: DomainTask }) => ({ type: "ADD-TASK", payload }) as const;
export const updateTaskAC = (payload: { todolistId: string; taskId: string; domainModel: UpdateTaskDomainModel }) =>
  ({ type: "UPDATE-TASK", payload }) as const;

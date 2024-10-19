import { FilterValueProps } from "common/types/Tasks/FilterValueProps.ts";
import { TodolistsActionsProps } from "common/types/Todolists/TodolistsActionsProps.ts";
import { DomainTodolist, Todolist } from "common/types/Todolists/TodolistsResponseProps.ts";

const initialTodolistsState: DomainTodolist[] = [];

export const todolistsReducer = (
  state: DomainTodolist[] = initialTodolistsState,
  action: TodolistsActionsProps
): DomainTodolist[] => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((todolist) => ({ ...todolist, filter: "All" }));
    case "REMOVE-TODOLIST":
      return state.filter((todolist) => todolist.id !== action.payload.todolistID);
    case "ADD-TODOLIST": {
      const newTodolist: DomainTodolist = {
        id: action.payload.todolist.id,
        title: action.payload.todolist.title,
        filter: "All",
        addedDate: new Date().toISOString(),
        order: 0,
      };
      return [newTodolist, ...state];
    }
    case "CHANGE-TODOLIST-TITLE":
      return state.map((todolist) =>
        todolist.id === action.payload.todolistID ? { ...todolist, title: action.payload.title } : todolist
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((todolist) =>
        todolist.id === action.payload.todolistID ? { ...todolist, filter: action.payload.filter } : todolist
      );
    default:
      return state;
  }
};

export const setTodolistsAC = (todolists: Todolist[]) => ({ type: "SET-TODOLISTS", todolists }) as const;
export const removeTodolistAC = (todolistID: string) =>
  ({ type: "REMOVE-TODOLIST", payload: { todolistID: todolistID } }) as const;
export const addTodolistAC = (todolist: Todolist) =>
  ({ type: "ADD-TODOLIST", payload: { todolist: todolist } }) as const;
export const changeTodolistTitleAC = (payload: { todolistID: string; title: string }) =>
  ({ type: "CHANGE-TODOLIST-TITLE", payload }) as const;
export const changeTodolistFilterAC = (payload: { todolistID: string; filter: FilterValueProps }) =>
  ({ type: "CHANGE-TODOLIST-FILTER", payload }) as const;

import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {TasksActionsProps} from "common/types/taskReducer/TasksActionsProps.ts";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateProps, action: TasksActionsProps): TasksStateProps => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const {todolistID, taskID} = action.payload
            return {
                ...state,
                [todolistID]: state[todolistID].filter(task => task.id !== taskID)
            }
        }
        case "ADD-TASK": {
            const {todolistID, title} = action.payload
            return {
                ...state,
                [todolistID]: [{id: v1(), title: title, isDone: false}, ...state[todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            const {todolistID, taskID, isDone} = action.payload
            return {
                ...state,
                [todolistID]: state[todolistID].map(task => task.id === taskID ? {...task, isDone: isDone} : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            const {todolistID, taskID, title} = action.payload
            return {
                ...state,
                [todolistID]: state[todolistID].map(task => task.id === taskID ? {...task, title: title} : task)
            }
        }
        case "ADD-TODOLIST": {
            return {[action.payload.todolistID]: [], ...state}
        }
        case "REMOVE-TODOLIST": {
            // const copyState = {...state};
            // delete copyState[action.payload.todolistID];
            // return copyState
            const {[action.payload.todolistID]: removedTodolist, ...restState} = state
            return restState
        }
        default:
            throw new Error(`Unknown action type: ${(action as { type: string }).type}`);
    }
}

export const removeTaskAC = (payload: { todolistID: string, taskID: string }) =>
    ({type: "REMOVE-TASK", payload}) as const
export const addTaskAC = (payload: { todolistID: string, title: string }) =>
    ({type: "ADD-TASK", payload}) as const
export const changeTaskStatusAC = (payload: {todolistID: string, taskID: string, isDone: boolean }) =>
    ({type: "CHANGE-TASK-STATUS", payload}) as const
export const changeTaskTitleAC = (payload: {todolistID: string, taskID: string, title: string }) =>
    ({type: "CHANGE-TASK-TITLE", payload}) as const

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
        default: {
            const unknownAction = action as unknown
            throw new Error(`Unknown action type: ${(unknownAction as {type: string}).type}`);
        }
    }
}

export const removeTaskAC = (payload: { todolistID: string, taskID: string }) =>
    ({type: "REMOVE-TASK", payload}) as const
export const addTaskAC = (payload: { todolistID: string, title: string }) =>
    ({type: "ADD-TASK", payload}) as const
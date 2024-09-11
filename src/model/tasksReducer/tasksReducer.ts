import {TasksActionsProps} from "common/types/taskReducer/TasksActionsProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";

export const tasksReducer = (state: TasksStateProps, action: TasksActionsProps)=> {
    const {todolistID, taskID} = action.payload
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [todolistID]: state[todolistID].filter(task => task.id !== taskID)
            }
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

export const removeTaskAC = (payload: {todolistID: string, taskID: string}) =>
    ({type: "REMOVE-TASK", payload}) as const

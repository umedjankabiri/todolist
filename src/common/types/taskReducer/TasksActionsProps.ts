import {addTaskAC, changeTaskStatusAC, removeTaskAC} from "model/tasksReducer/tasksReducer";

export type RemoveTaskActionProps = ReturnType<typeof removeTaskAC>
export type AddTaskActionProps = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusProps = ReturnType<typeof changeTaskStatusAC>
export type TasksActionsProps = RemoveTaskActionProps
    | AddTaskActionProps
    | ChangeTaskStatusProps

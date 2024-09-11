import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "model/tasksReducer/tasksReducer";

export type RemoveTaskActionProps = ReturnType<typeof removeTaskAC>
export type AddTaskActionProps = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusProps = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleProps = ReturnType<typeof changeTaskTitleAC>
export type TasksActionsProps = RemoveTaskActionProps
    | AddTaskActionProps
    | ChangeTaskStatusProps
    | ChangeTaskTitleProps

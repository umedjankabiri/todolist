import {addTaskAC, removeTaskAC} from "model/tasksReducer/tasksReducer";

export type TasksActionsProps = RemoveTaskActionProps | AddTaskActionProps

export type RemoveTaskActionProps = ReturnType<typeof removeTaskAC>
export type AddTaskActionProps = ReturnType<typeof addTaskAC>

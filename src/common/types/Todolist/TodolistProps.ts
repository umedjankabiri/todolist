import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";

export type TodolistProps = {
    todolistID: string
    title: string
    tasks: TaskProps[]
    removeTask: (taskID: string) => void
    changeFilter: (todolistID: string, filtered: FilterValueProps) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, taskStatus: boolean) => void
    filter: string
}
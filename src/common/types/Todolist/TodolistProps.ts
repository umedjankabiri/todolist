import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";

export type TodolistProps = {
    todolistID: string
    title: string
    tasks: TaskProps[]
    removeTodolist: (todolistID: string) => void
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (todolistID: string, filtered: FilterValueProps) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskID: string, taskStatus: boolean) => void
    filter: string
}
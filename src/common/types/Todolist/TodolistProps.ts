import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";

export type TodolistProps = {
    title: string
    tasks: TaskProps[]
    removeTask: (taskID: string) => void
    changeFilter: (filtered: FilterValueProps) => void
}
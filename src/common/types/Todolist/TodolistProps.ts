import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {FilterValuesProps} from "common/types/Tasks/FilterValuesProps.ts";

export type TodolistProps = {
    title: string
    tasks: TaskProps[]
    removeTask: (taskID: number) => void
    changedFilter: (filtered: FilterValuesProps) => void
}
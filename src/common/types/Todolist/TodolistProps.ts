import {TaskProps} from "common/types/Tasks/TaskProps.ts";

export type TodolistProps = {
    title: string
    tasks: TaskProps[]
    date?: string
}
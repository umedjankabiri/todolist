import {FC} from "react";
import {TodolistProps} from "common/types/Todolists/Todolist/TodolistProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";
import {RootState} from "App/store.ts";
import {useSelector} from "react-redux";
import {List} from "@mui/material";
import {Task} from "common/components/Todolists/Tasks/Task/Task.tsx";

export const Tasks: FC<TodolistProps> = ({todolist}) => {
    const tasks = useSelector<RootState, TasksStateProps>(state => state.tasks)

    const {filter} = todolist

    let todolistTasks = tasks[todolist.todolistID]

    filter === "Active" && (todolistTasks = todolistTasks.filter(task => !task.isDone))
    filter === "Completed" && (todolistTasks = todolistTasks.filter(task => task.isDone))

    const mappedTasks = todolistTasks.map(task => {
        return (
            <List>
                <Task todolist={todolist} task={task}/>
            </List>
        )
    })

    return (
        <List>
            {todolistTasks.length > 0 ? mappedTasks :
                <span style={{fontSize: 20, fontWeight: "bold"}}>No tasks</span>}
        </List>
    );
};

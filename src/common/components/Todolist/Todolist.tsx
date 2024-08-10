import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";
import {Button} from "common/components/Button/Button.tsx";
import {FC} from "react";

export const Todolist: FC<TodolistProps> = (props) => {
    const mappedTasks = props.tasks.map(task => {
        const onClickRemoveTask = () => props.removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <Button title={"x"} onClick={onClickRemoveTask} />
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            <ul>
                { props.tasks.length > 0 ? mappedTasks : <span>No tasks</span> }
            </ul>
            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
        </div>
    );
};
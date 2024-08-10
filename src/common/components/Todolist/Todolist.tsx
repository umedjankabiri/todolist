import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";
import {Button} from "common/components/Button/Button.tsx";
import {ChangeEvent, KeyboardEvent, FC, useState} from "react";

export const Todolist: FC<TodolistProps> = (props) => {
    const [taskTitle, setTaskTitle] = useState("")
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setTaskTitle(event.currentTarget.value)
    const AddTaskHandler = () => {
        props.addTask(taskTitle);
        setTaskTitle("")
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) =>
        (event.ctrlKey && event.key === "Enter") ?? addTaskHandler();
    const onClickAllHandler = () => props.changeFilter("All")
    const onClickActiveHandler = () => props.changeFilter("Active")
    const onClickCompletedHandler = () => props.changeFilter("Completed")

    const mappedTasks = props.tasks.map(task => {
        const onClickRemoveTask = () => props.removeTask(task.id)

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <Button title={"x"} onClick={onClickRemoveTask}/>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title={"+"} onClick={AddTaskHandler}/>
            </div>
            <ul>
                {props.tasks.length > 0 ? mappedTasks : <span>No tasks</span>}
            </ul>
            <div>
                <Button title={"All"} onClick={onClickAllHandler}/>
                <Button title={"Active"} onClick={onClickActiveHandler}/>
                <Button title={"Completed"} onClick={onClickCompletedHandler}/>
            </div>
        </div>
    );
};
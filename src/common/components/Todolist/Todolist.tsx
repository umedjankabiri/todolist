import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";
import {Button} from "common/components/Button/Button.tsx";
import {ChangeEvent, FC, KeyboardEvent, useState} from "react";

export const Todolist: FC<TodolistProps> = (props) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setTaskTitle(event.currentTarget.value)
    const addTaskHandler = () => {
        taskTitle.trim() !== ''
            ? (props.addTask(props.todolistID, taskTitle.trim()), setTaskTitle(""))
            : setError("Title is required");
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        taskTitle.trim() !== '' && setError(null);
        (event.ctrlKey && event.key === "Enter") && addTaskHandler()
    }
    const onClickRemoveTodolist = () => props.removeTodolist(props.todolistID)
    const onClickAllHandler = () => props.changeFilter(props.todolistID, "All")
    const onClickActiveHandler = () => props.changeFilter(props.todolistID, "Active")
    const onClickCompletedHandler = () => props.changeFilter(props.todolistID, "Completed")

    const mappedTasks = props.tasks.map(task => {
        const onClickRemoveTaskHandler = () => props.removeTask(props.todolistID, task.id)
        const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(props.todolistID, task.id, event.currentTarget.checked)

        return (
            <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                <input className={error ? 'error' : ''}
                       type="checkbox" checked={task.isDone}
                       onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
                <Button title='x' onClick={onClickRemoveTaskHandler}/>
            </li>
        )
    })

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>{props.title}</h3>
                <Button title={"x"} onClick={onClickRemoveTodolist}/>
            </div>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title={"+"} onClick={addTaskHandler}/>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.length > 0 ? mappedTasks : <span>No tasks</span>}
            </ul>
            <div>
                <Button
                    className={props.filter === "All" ? "activeFilter" : ""}
                    title={"All"}
                    onClick={onClickAllHandler}
                />
                <Button
                    className={props.filter === "Active" ? "activeFilter" : ""}
                    title={"Active"}
                    onClick={onClickActiveHandler}
                />
                <Button
                    className={props.filter === "Completed" ? "activeFilter" : ""}
                    title={"Completed"}
                    onClick={onClickCompletedHandler}
                />
            </div>
        </div>
    );
};
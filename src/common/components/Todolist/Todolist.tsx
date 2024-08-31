import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";
import {Button} from "common/components/Button/Button.tsx";
import {ChangeEvent, FC} from "react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm.tsx";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan.tsx";

export const Todolist: FC<TodolistProps> = (props) => {
    const addTaskHandler = (title: string) => {
        props.addTask(props.todolistID, title)
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
                <input type="checkbox" checked={task.isDone}
                       onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button title='x' onClick={onClickRemoveTaskHandler}/>
            </li>
        )
    })

    return (
        <div>
            <div className={"todolist-title-container"}>
                <EditableSpan title={props.title}/>
                <Button title={"x"} onClick={onClickRemoveTodolist}/>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
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
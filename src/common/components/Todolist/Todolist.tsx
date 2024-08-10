import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";

export const Todolist = (props: TodolistProps) => {
    const mappedTasks = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                { props.tasks.length > 0 ? mappedTasks : <span>No tasks</span> }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{props.date}</div>
        </div>
    );
};
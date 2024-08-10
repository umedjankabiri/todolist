import {TodolistProps} from "common/types/Todolist/TodolistProps.ts";

export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span>
                </li>
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
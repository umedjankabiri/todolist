import 'common/components/App/App.css'
import {Todolist} from 'common/components/Todolist/Todolist.tsx';
import {useState} from "react";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {v1} from "uuid";
import {TodolistsProps} from "common/components/Todolist/TodolistsProps.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";

// Business Logic Layer (BLL)
let todolistID1 = v1()
let todolistID2 = v1()
const todolistsInitialState: TodolistsProps[] = [
    {todolistID: todolistID1, title: "What to read", filter: "All"},
    {todolistID: todolistID2, title: "What to buy", filter: "All"},
]
const initialState: TasksStateProps = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'macbook pro 16 M3 MAX', isDone: true},
        {id: v1(), title: 'iphone 15 512 pro MAX', isDone: true},
        {id: v1(), title: 'ipad', isDone: false},
        {id: v1(), title: 'apple watch ultra', isDone: false},
        {id: v1(), title: 'airpods', isDone: false},
    ]
}

function App() {
    const [todolists, setTodolists] = useState(todolistsInitialState)
    const [tasks, setTasks] = useState(initialState);

    const removedTask = (todolistID: string, taskID: string) =>
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskID)});
    const addedTask = (todolistID: string, title: string) =>
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]});
    const changedTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) =>
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task =>
                task.id === taskID ? {...task, isDone: taskStatus} : task)});
    const changedFilter = (todolistID: string, filterValue: FilterValueProps) =>
        setTodolists(todolists.map(todolist =>
            todolist.todolistID === todolistID ? {...todolist, filter: filterValue} : todolist))
    const removedTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.todolistID !== todolistID))
        delete tasks[todolistID];
    }

    const filteredTodolists = todolists.map(todolist => {
        let filteredTasks = tasks[todolist.todolistID]
        todolist.filter === "Active" && (filteredTasks = filteredTasks.filter(task => !task.isDone))
        todolist.filter === "Completed" && (filteredTasks = filteredTasks.filter(task => task.isDone))

        return (
            <Todolist
                key={todolist.todolistID}
                todolistID={todolist.todolistID}
                title= {todolist.title}
                tasks={filteredTasks}
                removeTodolist={removedTodolist}
                removeTask={removedTask}
                changeFilter={changedFilter}
                addTask={addedTask}
                changeTaskStatus={changedTaskStatus}
                filter={todolist.filter}
            />
        )
    })

    return (
        <div className="App">
            {filteredTodolists}
        </div>
    );
}

export default App

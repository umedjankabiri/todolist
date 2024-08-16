import 'common/components/App/App.css'
import {Todolist} from 'common/components/Todolist/Todolist.tsx';
import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {useState} from "react";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {v1} from "uuid";
import {TodolistsProps} from "common/components/Todolist/TodolistsProps.ts";

// Business Logic Layer (BLL)
let todolistID1 = v1()
let todolistID2 = v1()
const todolistsInitialState: TodolistsProps[] = [
    {todolistID: todolistID1, title: "What to read", filter: "All"},
    {todolistID: todolistID2, title: "What to buy", filter: "All"},
]
const initialState: TaskProps[] = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
]

function App() {
    const [tasks, setTasks] = useState<TaskProps[]>(initialState);
    const [todolists, setTodolists] = useState<TodolistsProps[]>(todolistsInitialState)

    const removedTask = (taskID: string) => setTasks(tasks.filter(task => task.id !== taskID));
    const addedTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changedTaskStatus = (taskID: string, taskStatus: boolean) =>
        setTasks(tasks.map(task => task.id === taskID ? {...task, isDone: taskStatus} : task));
    const changedFilter = (todolistID: string, filterValue: FilterValueProps) =>
        setTodolists(todolists.map(todolist =>
            todolist.todolistID === todolistID ? {...todolist, filter: filterValue} : todolist))

    const filteredTodolists = todolists.map(todolist => {
        let tasksForTodolist = tasks
        todolist.filter === "Active" && (tasksForTodolist = tasks.filter(task => !task.isDone))
        todolist.filter === "Completed" && (tasksForTodolist = tasks.filter(task => task.isDone))

        return (
            <Todolist
                key={todolist.todolistID}
                todolistID={todolist.todolistID}
                title= {todolist.title}
                tasks={tasksForTodolist}
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

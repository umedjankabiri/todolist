import 'common/components/App/App.css'
import { Todolist } from 'common/components/Todolist/Todolist.tsx';
import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {useState} from "react";
import {FilterValueProps} from "common/types/Tasks/FilterValueProps.ts";
import {v1} from "uuid";

// Business Logic Layer (BLL)
const initialState: TaskProps[] = [
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
]

function App() {
    const [tasks, setTasks] = useState<TaskProps[]>(initialState);
    const [filteredTasks, setFilteredTasks] = useState<FilterValueProps>("All");

    let tasksForTodolist = tasks
    filteredTasks === "Active" && (tasksForTodolist = tasks.filter(task => !task.isDone))
    filteredTasks === "Completed" && (tasksForTodolist = tasks.filter(task => task.isDone))

    const removedTask = (taskID: string) => setTasks(tasks.filter(task => task.id !== taskID));
    const changedFilter = (filter: FilterValueProps) => setFilteredTasks(filter)
    const addedTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    return (
      <div className="App">
        <Todolist
            title="what to lean"
            tasks={tasksForTodolist}
            removeTask={removedTask}
            changeFilter={changedFilter}
            addTask={addedTask}
        />
      </div>
  );
}

export default App

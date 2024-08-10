import 'common/components/App/App.css'
import { Todolist } from 'common/components/Todolist/Todolist.tsx';
import {TaskProps} from "common/types/Tasks/TaskProps.ts";
import {useState} from "react";
import {FilterValuesProps} from "common/types/Todolist/FilterValuesProps.ts";

// Business Logic Layer (BLL)
const initialState: TaskProps[] = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
]

function App() {
    const [tasks, setTasks] = useState<TaskProps[]>(initialState);
    const [filteredTasks, setFilteredTasks] = useState<FilterValuesProps>("All");

    let tasksForTodolist = tasks
    filteredTasks === "Active" && (tasksForTodolist = tasks.filter(task => !task.isDone))
    filteredTasks === "Completed" && (tasksForTodolist = tasks.filter(task => task.isDone))



    return (
      <div className="App">
        <Todolist
            title="what to leand"
            tasks={tasks}
        />
      </div>
  );
}

export default App

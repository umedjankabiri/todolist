import 'common/components/App/App.css'
import { Todolist } from 'common/components/Todolist/Todolist.tsx';
import {TaskProps} from "common/types/Tasks/TaskProps.ts";

function App() {
    const tasks1: TaskProps[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]
    const tasks2: TaskProps[] = []

  return (
      <div className="App">
        <Todolist
            title="what to leand"
            tasks={tasks1}
        />
        <Todolist
            title = "Songs"
            tasks={tasks2}
        />
      </div>
  );
}

export default App

import { Todolist } from 'common/components/Todolist/Todolist.tsx';
import 'common/components/App/App.css'

function App() {
  return (
      <div className="App">
        <Todolist title="what to leand"/>
        <Todolist title = "Songs" />
        <Todolist title = "Books" />
      </div>
  );
}

export default App

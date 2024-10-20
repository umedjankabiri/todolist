export { fetchTodolistsTC, addTodolistTC, updateTodolistTitleTC, deleteTodolistTC } from "./thunks/todolistsThunks.ts";
export { fetchTasksTC, addTaskTC, updateTaskTC, deleteTaskTC } from "./thunks/tasksThunks.ts";
export {
  setTodolistsAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  removeTodolistAC,
  todolistsReducer,
} from "./reducers/todolistsReducer.ts";

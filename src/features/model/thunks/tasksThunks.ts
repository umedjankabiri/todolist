import { Dispatch } from "redux";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { addTaskAC, removeTaskAC, setTasksAC } from "features/model/tasksReducer/tasksReducer.ts";

export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistID).then((response) => {
    const tasks = response.data.items;
    dispatch(setTasksAC({ todolistId: todolistID, tasks }));
  });
};
export const deleteTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  tasksApi.deleteTask(args).then(() => {
    dispatch(removeTaskAC(args));
  });
};
export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  tasksApi.createTask(args).then((response) => {
    dispatch(addTaskAC({ task: response.data.data.item }));
  });
};

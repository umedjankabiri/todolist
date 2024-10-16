import { Dispatch } from "redux";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, setTasksAC } from "features/model/tasksReducer/tasksReducer.ts";
import { RootState } from "App/store.ts";
import { TaskStatus } from "common";
import { UpdateTaskModel } from "common/types/Tasks";

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
export const changeTaskStatusTC =
  (args: { todolistId: string; taskId: string; status: TaskStatus }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const { todolistId, taskId, status } = args;
    const stateTasks = getState().tasks;
    const currentTask = stateTasks[todolistId];
    const task = currentTask.find((t) => t.id === taskId);
    if (task) {
      const model: UpdateTaskModel = {
        status: status,
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      };

      tasksApi.updateTask({ todolistId, taskId, model }).then(() => {
        dispatch(changeTaskStatusAC(args));
      });
    }
  };

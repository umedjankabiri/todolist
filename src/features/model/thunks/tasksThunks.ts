import { Dispatch } from "redux";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "features/model/reducers/tasksReducer.ts";
import { RootState } from "App/store.ts";
import { UpdateTaskDomainModel, UpdateTaskModel } from "common/types/Tasks";
import { setStatusAC } from "features/model/reducers/statusReducer.ts";

export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  tasksApi.getTasks(todolistID).then((response) => {
    dispatch(setStatusAC("success"));
    dispatch(setTasksAC({ todolistId: todolistID, tasks: response.data.items }));
  });
};
export const deleteTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  tasksApi.deleteTask(args).then(() => {
    dispatch(setStatusAC("success"));
    dispatch(removeTaskAC(args));
  });
};
export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  tasksApi.createTask(args).then((response) => {
    dispatch(setStatusAC("success"));
    dispatch(addTaskAC({ task: response.data.data.item }));
  });
};
export const updateTaskTC =
  (args: { todolistId: string; taskId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setStatusAC("loading"));
    const { todolistId, taskId, domainModel } = args;
    const stateTasks = getState().tasks;
    const currentTask = stateTasks[todolistId];
    const task = currentTask.find((t) => t.id === taskId);
    if (task) {
      const model: UpdateTaskModel = {
        title: task.title,
        status: task.status,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        ...domainModel,
      };

      tasksApi.updateTask({ todolistId, taskId, model }).then(() => {
        dispatch(setStatusAC("success"));
        dispatch(updateTaskAC({ todolistId, taskId, domainModel }));
      });
    }
  };

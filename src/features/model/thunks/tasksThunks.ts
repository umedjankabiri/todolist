import { Dispatch } from "redux";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "features/model/reducers/tasksReducer.ts";
import { RootState } from "App/store.ts";
import { UpdateTaskDomainModel, UpdateTaskModel } from "common/types/Tasks";
import { setErrorAC, setStatusAC } from "features/model/reducers/statusReducer.ts";
import { ResultCode } from "common/utils/enums/enumErrorStatus.ts";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError.ts";
import { handleServerError } from "common/utils/handleServerError.ts";

export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  tasksApi.getTasks(todolistID).then((response) => {
    dispatch(setTasksAC({ todolistId: todolistID, tasks: response.data.items }));
    dispatch(setStatusAC("success"));
  });
};
export const deleteTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  tasksApi
    .deleteTask(args)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(removeTaskAC(args));
        dispatch(setStatusAC("success"));
      } else if (response.data.resultCode === ResultCode.ERROR) {
        dispatch(setErrorAC(response.data.messages[0]));
      } else handleServerError(response.data, dispatch);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};
export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setStatusAC("loading"));
  tasksApi
    .createTask(args)
    .then((response) => {
      if (response.data.resultCode === ResultCode.SUCCESS) {
        dispatch(addTaskAC({ task: response.data.data.item }));
        dispatch(setStatusAC("success"));
      } else if (response.data.resultCode === ResultCode.ERROR) {
        dispatch(setErrorAC(response.data.messages[0]));
      } else handleServerError(response.data, dispatch);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
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

      tasksApi
        .updateTask({ todolistId, taskId, model })
        .then((response) => {
          if (response.data.resultCode === ResultCode.SUCCESS) {
            dispatch(updateTaskAC({ todolistId, taskId, domainModel }));
            dispatch(setStatusAC("success"));
          } else if (response.data.resultCode === ResultCode.ERROR) {
            dispatch(setErrorAC(response.data.messages[0]));
          } else handleServerError(response.data, dispatch);
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch);
        });
    }
  };

import { Dispatch } from "redux";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from "features/model/tasksReducer/tasksReducer.ts";
import { RootState } from "App/store.ts";
import { UpdateTaskDomainModel, UpdateTaskModel } from "common/types/Tasks";

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
export const updateTaskTC =
  (args: { todolistId: string; taskId: string; domainModel: UpdateTaskDomainModel }) =>
  (dispatch: Dispatch, getState: () => RootState) => {
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
        dispatch(updateTaskAC({ todolistId, taskId, domainModel }));
      });
    }
  };

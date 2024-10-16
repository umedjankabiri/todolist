import { Dispatch } from "redux";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { setTasksAC } from "features/model/tasksReducer/tasksReducer.ts";

export const fetchTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
  tasksApi.getTasks(todolistID).then((response) => {
    const tasks = response.data.items;
    dispatch(setTasksAC({ todolistID, tasks }));
  });
};

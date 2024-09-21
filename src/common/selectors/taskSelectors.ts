import {RootState} from "App/store.ts";
import {TasksStateProps} from "common/types/Tasks/TasksStateProps.ts";

export const selectTasks = (state: RootState): TasksStateProps => state.tasks

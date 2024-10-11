import {GetTasksResponse} from "features/ui/Todolists/types/tasksApi.types.ts";
import {tasksInstance} from "common/instance/tasksInstance.ts";

export const tasksApi = {
    getTasks(id: string) {
        return tasksInstance(id).get<GetTasksResponse>(`tasks`)
    }
}

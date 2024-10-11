import {CreateTasksResponse, GetTasksResponse} from "features/ui/Todolists/types/tasksApi.types.ts";
import {tasksInstance} from "common/instance/tasksInstance.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return tasksInstance(todolistId).get<GetTasksResponse>(`tasks`)
    },
    createTask(title: string, todolistId: string) {
        return tasksInstance(todolistId).post<CreateTasksResponse>(`tasks`, {title: title})
    }
}

import {
    CreateTasksResponse,
    DomainTask,
    GetTasksResponse, UpdateTaskModel,
    UpdateTaskResponse
} from "features/ui/Todolists/types/tasksApi.types.ts";
import {tasksInstance} from "common/instance/tasksInstance.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return tasksInstance(todolistId).get<GetTasksResponse>(`tasks`)
    },
    createTask(title: string, todolistId: string) {
        return tasksInstance(todolistId).post<CreateTasksResponse>(`tasks`, {title: title})
    },
    changeTaskStatus(task: DomainTask, model: UpdateTaskModel) {
        return tasksInstance(task.todoListId).put<UpdateTaskResponse>(`tasks/${task.id}`, model)
    }
}

import {tasksInstance} from "common/instance/tasksInstance.ts";
import {DomainTask, GetTasksResponse, TasksResponse, UpdateTaskModel} from "common/types/Tasks/TasksApiProps.ts";

export const tasksApi = {
    getTasks(todolistId: string) {
        return tasksInstance(todolistId).get<GetTasksResponse>(`tasks`)
    },
    createTask(title: string, todolistId: string) {
        return tasksInstance(todolistId).post<TasksResponse<{item: DomainTask}>>(`tasks`, {title: title})
    },
    changeTaskStatus(task: DomainTask, model: UpdateTaskModel) {
        return tasksInstance(task.todoListId).put<TasksResponse<{item: DomainTask}>>(`tasks/${task.id}`, model)
    },
    changeTaskTitle(title: string, task: DomainTask) {
        return tasksInstance(task.todoListId).put<TasksResponse>(`tasks/${task.id}`, {title: title})
    },
    deleteTask(taskId: string, todolistId: string) {
        return tasksInstance(todolistId).delete<TasksResponse>(`tasks/${taskId}`)
    }
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    item: DomainTask[]
}
export type TasksKeyState = {
    [key: string]: DomainTask[]
}
export type DomainTask = {
    todoListId: string
    id: string
    title: string
    description: string
    status: number
    priority: number
    order: number
    deadline: string
    startDate: string
    addedDate: string
}
export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
}
export type TasksResponse<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

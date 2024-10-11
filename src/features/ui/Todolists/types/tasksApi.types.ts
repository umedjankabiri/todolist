export type TasksKeyState = {
    [key: string]: DomainTask[]
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
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
export type CreateTasksResponse = {
    data: { item: DomainTask }
    fieldErrors: string[]
    messagesErrors: string
    resultCode: number
}
export type UpdateTaskModel = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
}
export type UpdateTaskResponse = {
    data: { item: DomainTask }
    messages: string[]
    resultCode: number
}
export type DeleteTaskResponse = {
    data: {}
    messages: string[]
    resultCode: number
}

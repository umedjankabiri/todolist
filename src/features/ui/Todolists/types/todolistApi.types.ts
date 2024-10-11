export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldError = {
    error: string
    field: string
}
export type CreateDeleteTodolistResponse = {
    data: { item: Todolist }
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}
export type DeleteTodolistResponse = {
    data: {}
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
export type UpdateTodolistResponse = {
    data: {}
    fieldsErrors: FieldError[]
    messages: string[]
    resultCode: number
}

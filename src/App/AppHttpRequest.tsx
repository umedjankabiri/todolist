import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<TasksKeyState>({})

    useEffect(() => {
        axios.get<Todolist[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        })
            .then((response) => {
                setTodolists(response.data)
                response.data.forEach(todolist => {
                  axios.get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolist.id}/tasks`, {
                        headers: {
                            Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                            "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
                        }
                    }).then(response => {
                        setTasks(prevTask => ({...prevTask, [todolist.id]: response.data.items}))
                    })
                })
            })
    }, [])

    const createTodolistHandler = (title: string) => {
        axios.post<CreateDeleteTodolistResponse>("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: title}, {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                    "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
                }
            }).then((response) => {
            setTodolists([response.data.data.item, ...todolists])
        })
    }

    const removeTodolistHandler = (todolistID: string) => {
        axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        }).then(() => {
            setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
        }).then(() => {
            axios.get<Todolist[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc"
                }
            })
                .then((response) => {
                    setTodolists(response.data)
                })
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        }).then(() => {
            setTodolists(todolists.map(todolist => todolist.id === id ? {...todolist, title: title} : todolist))
        }).then(() => {
            axios.get<Todolist[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc"
                }
            })
                .then((response) => {
                    setTodolists(response.data)
                })
        })
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        axios.post<CreateTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title: title}, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        }).then((response) => {
            setTasks({...tasks, [todolistId]: [response.data.data.item, ...tasks[todolistId] ?? []]})
        });
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        axios.delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        }).then(() => {
            setTasks({...tasks, [todolistId]: tasks[todolistId] ? tasks[todolistId].filter(task => task.id !== taskId) : []})
        })
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        let status = e.currentTarget.checked ? 2 : 0
        const model: UpdateTaskModel = {
            status: status,
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        axios.put<UpdateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                    "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
                }
            }).then(() => {
            setTasks({
                ...tasks, [task.todoListId]: tasks[task.todoListId]
                    .map(t => t.id === task.id ? {...t, ...model} : t)
            })
        })
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        const model: UpdateTaskModel = {
            status: task.status,
            title: title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }
        axios.put<UpdateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            model, {
                headers: {
                    Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                    "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
                }
            }).then(() => {
            setTasks({
                ...tasks, [task.todoListId]: tasks[task.todoListId]
                    .map(t => t.id === task.id ? {...t, ...model} : t)
            })
        })
    }

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: any) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                title={tl.title}
                                onChangeTitle={(title: string) => updateTodolistHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            title={task.title}
                                            onChangeTitle={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

// types
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
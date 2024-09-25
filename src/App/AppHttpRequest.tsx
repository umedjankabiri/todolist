import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        axios.get<Todolist[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc"
            }
        })
            .then((response) => {
                setTodolists(response.data)
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
            console.log(response.data)
            setTodolists([response.data.data.item, ...todolists])
        })
    }

    const removeTodolistHandler = (todolistID: string) => {
        axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, {
            headers: {
                Authorization: "Bearer ce08439a-a32a-4af0-8da4-627c8240efbc",
                "api-key": "60e0596e-352f-4b57-8e3f-8be82fb42652"
            }
        }).then((response) => {
            console.log(response.data)
            setTodolists(todolists.filter(todolist => todolist.todolistID !== todolistID))
        }).then(()=> {
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
        }).then((response)=> {
            console.log(response.data)
            setTodolists(todolists.map(todolist => todolist.todolistID === id ? {...todolist, title: title} : todolist))
        }).then(()=> {
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
        // create task
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
        // update task status
    }

    const changeTaskTitleHandler = (title: string, task: any) => {
        // update task title
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
                            tasks[tl.id].map((task: any) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.isDone}
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
    todolistID: string
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
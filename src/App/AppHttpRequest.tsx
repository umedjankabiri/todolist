import Checkbox from '@mui/material/Checkbox'
import React, {ChangeEvent, useEffect, useState} from 'react'
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm'
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan'
import {DomainTask, TasksKeyState, UpdateTaskModel} from "features/ui/Todolists/types/tasksApi.types.ts";
import {todolistsApi} from "features/ui/Todolists/api/todolistsApi.ts";
import {tasksApi} from "features/ui/Todolists/api/tasksApi.ts";
import {Todolist} from "common/types/Todolists/TodolistsApiProps.ts";

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<TasksKeyState>({})

    useEffect(() => {
        todolistsApi.getTodolists().then((response) => {
            setTodolists(response.data)
            response.data.forEach(todolist => {
                tasksApi.getTasks(todolist.id).then(response => {
                    setTasks(prevTask => ({...prevTask, [todolist.id]: response.data.items}))
                })
            })
        })
    }, [])

    const createTodolistHandler = (title: string) => {
        todolistsApi.createTodolist(title).then((response) => {
            setTodolists([response.data.data.item, ...todolists])
        })
    }

    const deleteTodolistHandler = (todolistID: string) => {
        todolistsApi.deleteTodolist(todolistID).then(() => {
            setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
        }).then(() => {
            todolistsApi.getTodolists()
                .then((response) => {
                    setTodolists(response.data)
                })
        })
    }

    const updateTodolistHandler = (id: string, title: string) => {
        todolistsApi.updateTodolist({id: id, title: title}).then(() => {
            setTodolists(todolists.map(todolist => todolist.id === id ? {...todolist, title: title} : todolist))
        }).then(() => todolistsApi.getTodolists()
            .then((response) => {
                setTodolists(response.data)
            }))
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        tasksApi.createTask(title, todolistId).then((response) => {
            setTasks({...tasks, [todolistId]: [response.data.data.item, ...tasks[todolistId] ?? []]})
        });
    }

    const deleteTaskHandler = (taskId: string, todolistId: string) => {
        tasksApi.deleteTask(taskId, todolistId).then(() => {
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId] ? tasks[todolistId].filter(task => task.id !== taskId) : []
            })
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
        tasksApi.changeTaskStatus(task, model).then(() => {
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
        tasksApi.changeTaskTitle(title, task).then(() => {
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
                            <button onClick={() => deleteTodolistHandler(tl.id)}>x</button>
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
                                        <button onClick={() => deleteTaskHandler(task.id, tl.id)}>x</button>
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

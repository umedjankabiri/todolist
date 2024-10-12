import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { AddItemForm, EditableSpan } from "common/components";
import { todolistsApi } from "features/ui/Todolists/api/todolistsApi.ts";
import { tasksApi } from "features/ui/Todolists/api/tasksApi.ts";
import { Todolist } from "common/types/Todolists/TodolistsApiProps.ts";
import { DomainTask, TasksKeyState, UpdateTaskModel } from "common/types/Tasks/TasksApiProps.ts";
import { TaskStatus } from "common/utils/enums/enumTaskStatus.ts";

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<TasksKeyState>({});

  useEffect(() => {
    todolistsApi.getTodolists().then((response) => {
      setTodolists(response.data);
      response.data.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((response) => {
          setTasks((prevTask) => ({
            ...prevTask,
            [todolist.id]: response.data.items,
          }));
        });
      });
    });
  }, []);

  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title).then((response) => {
      setTodolists([response.data.data.item, ...todolists]);
    });
  };

  const deleteTodolistHandler = (todolistID: string) => {
    todolistsApi.deleteTodolist(todolistID).then(() => {
      setTodolists(todolists.filter((todolist) => todolist.id !== todolistID));
    });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    todolistsApi.updateTodolist({ id: id, title: title }).then(() => {
      setTodolists(todolists.map((todolist) => (todolist.id === id ? { ...todolist, title: title } : todolist)));
    });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    tasksApi.createTask({ todolistId, title }).then((response) => {
      setTasks({
        ...tasks,
        [todolistId]: [response.data.data.item, ...(tasks[todolistId] ?? [])],
      });
    });
  };

  const deleteTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.deleteTask({ todolistId, taskId }).then(() => {
      setTasks({
        ...tasks,
        [todolistId]: tasks[todolistId] ? tasks[todolistId].filter((task) => task.id !== taskId) : [],
      });
    });
  };

  const updateTaskHandler = (todolistId: string, taskId: string, task: DomainTask) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    };

    tasksApi.updateTask({ todolistId, taskId, model }).then((response) => {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [todolistId]: prevTasks[todolistId].map((task) => (task.id === taskId ? response.data.data.item : task)),
      }));
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: any) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan title={tl.title} onChangeTitle={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => deleteTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === TaskStatus.Completed}
                      onChange={(e) =>
                        updateTaskHandler(tl.id, task.id, {
                          ...task,
                          status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
                        })
                      }
                    />
                    <EditableSpan
                      title={task.title}
                      onChangeTitle={(title) => updateTaskHandler(tl.id, task.id, { ...task, title: title })}
                    />
                    <button onClick={() => deleteTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

// Styles
const todolist: React.CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

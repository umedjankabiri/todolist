import { FC, useEffect } from "react";
import { TodolistProps } from "common/types/Todolists/TodolistProps.ts";
import { List } from "@mui/material";
import { Task } from "features/ui/Todolists/Todolist/Tasks/Task/Task.tsx";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectTasks } from "common/selectors/taskSelectors.ts";
import { TaskStatus } from "common";
import { AppDispatch } from "App/store.ts";
import { useDispatch } from "react-redux";
import { fetchTasksTC } from "features/model/thunks/tasksThunks.ts";

export const Tasks: FC<TodolistProps> = ({ todolist }) => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id));
  }, [dispatch]);

  const { filter } = todolist;

  let todolistTasks = tasks[todolist.id];

  filter === "Active" && (todolistTasks = todolistTasks.filter((task) => task.status === TaskStatus.New));
  filter === "Completed" && (todolistTasks = todolistTasks.filter((task) => task.status === TaskStatus.Completed));

  const mappedTasks = todolistTasks?.map((task) => {
    return (
      <List key={task.id}>
        <Task todolist={todolist} task={task} />
      </List>
    );
  });

  return (
    <List>
      {todolistTasks?.length > 0 ? mappedTasks : <span style={{ fontSize: 20, fontWeight: "bold" }}>No tasks</span>}
    </List>
  );
};

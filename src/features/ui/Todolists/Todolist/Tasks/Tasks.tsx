import { FC } from "react";
import { TodolistProps } from "common/types/Todolists/Todolist/TodolistProps.ts";
import { List } from "@mui/material";
import { Task } from "features/ui/Todolists/Todolist/Tasks/Task/Task.tsx";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectTasks } from "common/selectors/taskSelectors.ts";
import { TaskStatus } from "common";

export const Tasks: FC<TodolistProps> = ({ todolist }) => {
  const tasks = useAppSelector(selectTasks);

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

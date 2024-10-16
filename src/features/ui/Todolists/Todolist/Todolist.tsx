import { FC } from "react";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm.tsx";
import { FilterButtons } from "features/ui/Todolists/Todolist/FilterButtons/FilterButtons.tsx";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { TodolistTitle } from "features/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.tsx";
import { Tasks } from "features/ui/Todolists/Todolist/Tasks/Tasks.tsx";
import { TodolistProps } from "common/types/Todolists/Todolist/TodolistProps.ts";
import { addTaskTC } from "features/model/thunks/tasksThunks.ts";

export const Todolist: FC<TodolistProps> = ({ todolist }) => {
  const dispatch = useAppDispatch();

  const addTaskHandler = (title: string) => dispatch(addTaskTC({ todolistId: todolist.id, title: title }));

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  );
};

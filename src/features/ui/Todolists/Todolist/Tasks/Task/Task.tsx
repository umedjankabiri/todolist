import { ChangeEvent, FC } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { TodolistTaskProps } from "common/types/Todolists/TodolistTask/TodolistTaskProps.ts";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "features/model/tasksReducer/tasksReducer.ts";
import { Checkbox, ListItem } from "@mui/material";
import { getListItemSx } from "common/components/EditableSpan/EditableSpan.styles.ts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "common/components";
import { TaskStatus } from "common";

export const Task: FC<TodolistTaskProps> = ({ todolist, task }) => {
  const dispatch = useAppDispatch();

  const { id } = task;

  const removeTaskHandler = () => dispatch(removeTaskAC({ todolistID: todolist.id, taskID: id }));
  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      changeTaskStatusAC({
        todolistID: todolist.id,
        taskID: id,
        isDone: event.currentTarget.checked,
      })
    );
  const changeTaskTitleHandler = (title: string) =>
    dispatch(
      changeTaskTitleAC({
        todolistID: todolist.id,
        taskID: id,
        title: title,
      })
    );

  return (
    <>
      <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
        <div>
          <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} />
          <EditableSpan title={task.title} onChangeTitle={changeTaskTitleHandler} />
        </div>
        <IconButton onClick={removeTaskHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </>
  );
};

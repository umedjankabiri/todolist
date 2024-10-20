import { ChangeEvent, FC } from "react";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { TodolistTaskProps } from "common/types/Todolists/TodolistTaskProps.ts";
import { Checkbox, ListItem } from "@mui/material";
import { getListItemSx } from "common/components/EditableSpan/EditableSpan.styles.ts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditableSpan } from "common/components";
import { TaskStatus } from "common";
import { deleteTaskTC, updateTaskTC } from "features/model/thunks/tasksThunks.ts";

export const Task: FC<TodolistTaskProps> = ({ todolist, task }) => {
  const dispatch = useAppDispatch();

  const { id } = task;

  const removeTaskHandler = () => dispatch(deleteTaskTC({ todolistId: todolist.id, taskId: id }));
  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateTaskTC({
        todolistId: todolist.id,
        taskId: id,
        domainModel: { ...task, status: event.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New },
      })
    );
  const changeTaskTitleHandler = (title: string) =>
    dispatch(updateTaskTC({ todolistId: todolist.id, taskId: id, domainModel: { ...task, title: title } }));

  return (
    <>
      <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
        <div>
          <Checkbox
            disabled={todolist.entityStatus === "loading"}
            checked={task.status === TaskStatus.Completed}
            onChange={changeTaskStatusHandler}
          />
          <EditableSpan
            disabled={todolist.entityStatus === "loading"}
            title={task.title}
            onChangeTitle={changeTaskTitleHandler}
          />
        </div>
        <IconButton disabled={todolist.entityStatus === "loading"} onClick={removeTaskHandler}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </>
  );
};

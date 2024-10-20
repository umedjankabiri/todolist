import { FC } from "react";
import { TodolistProps } from "common/types/Todolists/TodolistProps.ts";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { deleteTodolistTC, updateTodolistTitleTC } from "features/model/thunks/todolistsThunks.ts";

export const TodolistTitle: FC<TodolistProps> = ({ todolist }) => {
  const dispatch = useAppDispatch();

  const { id, title, entityStatus } = todolist;
  const removeTodolistHandler = () => dispatch(deleteTodolistTC(id));
  const changeTodolistTitleHandler = (title: string) => dispatch(updateTodolistTitleTC({ id: id, title: title }));

  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan disabled={entityStatus === "loading"} title={title} onChangeTitle={changeTodolistTitleHandler} />
      </h3>
      <IconButton disabled={entityStatus === "loading"} onClick={removeTodolistHandler}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

import {ChangeEvent, FC, useState} from "react";
import {EditableSpanProps} from "common/types/EditableSpan/EditableSpanProps.ts";
import TextField from "@mui/material/TextField";

export const EditableSpan: FC<EditableSpanProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const activateEditModeHandler = () => {
        setEditMode(true);
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false);
        props.onChangeTitle(title);
    }
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <TextField variant={"outlined"}
                         value={title}
                         size={"small"}
                         onBlur={deactivateEditModeHandler}
                         onChange={changeTitleHandler}
                         autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
    );
};

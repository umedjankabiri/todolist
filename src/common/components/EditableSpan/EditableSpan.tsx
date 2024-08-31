import {FC, useState} from "react";
import {EditableSpanProps} from "common/types/EditableSpan/EditableSpanProps.ts";

export const EditableSpan: FC<EditableSpanProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditModeHandler = () => {
        setEditMode(true);
    }
    const deactivateEditModeHandler = () => {
        setEditMode(false);
    }

    return (
        editMode
            ? <input value={props.title} onBlur={deactivateEditModeHandler} autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
    );
};

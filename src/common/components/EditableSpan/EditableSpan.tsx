import {ChangeEvent, FC, useState} from "react";
import {EditableSpanProps} from "common/types/EditableSpan/EditableSpanProps.ts";

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
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>)=> {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title}
                     onBlur={deactivateEditModeHandler}
                     onChange={changeTitleHandler}
                     autoFocus/>
            : <span onDoubleClick={activateEditModeHandler}>{props.title}</span>
    );
};

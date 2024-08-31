import {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {AddItemFormProps} from "common/types/AddItemForm/AddItemFormProps.ts";
import {Button} from "common/components/Button/Button.tsx";

export const AddItemForm: FC<AddItemFormProps> = (props) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeItemHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setTaskTitle(event.currentTarget.value)
    const addItemHandler = () => {
        taskTitle.trim() !== ''
            ? (props.addItem(taskTitle.trim()), setTaskTitle(""))
            : setError("Title is required");
    }
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        taskTitle.trim() !== '' && setError(null);
        (event.ctrlKey && event.key === "Enter") && addItemHandler()
    }

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={taskTitle}
                   onChange={onChangeItemHandler}
                   onKeyUp={addItemOnKeyUpHandler}
            />
            <Button title={"+"} onClick={addItemHandler}/>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    );
};

import {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {AddItemFormProps} from "common/types/AddItemForm/AddItemFormProps.ts";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

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
            <TextField label={!!error ? error : "Enter a title"}
                       variant={"outlined"}
                       className={error ? "error" : ""}
                       value={taskTitle}
                       size={"small"}
                       error={!!error}
                       onChange={onChangeItemHandler}
                       onKeyUp={addItemOnKeyUpHandler}
            />
            {/*<Button variant={"contained"} onClick={addItemHandler}>+</Button>*/}
            <IconButton onClick={addItemHandler} color={"primary"}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};

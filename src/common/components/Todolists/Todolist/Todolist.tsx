import {TodolistProps} from "common/types/Todolists/Todolist/TodolistProps.ts";
import {FC} from "react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm.tsx";
import {FilterButtons} from "common/components/Todolists/Tasks/FilterButtons/FilterButtons.tsx";
import {useDispatch} from "react-redux";
import {addTaskAC} from "model/tasksReducer/tasksReducer.ts";
import {TodolistTitle} from "common/components/Todolists/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "common/components/Todolists/Tasks/Tasks.tsx";

export const Todolist: FC<TodolistProps> = ({todolist}) => {
    const dispatch = useDispatch()

    const addTaskHandler = (title: string) => dispatch(addTaskAC({todolistID: todolist.todolistID, title: title}))

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    );
};

import {TodolistProps} from "common/types/Todolists/Todolist/TodolistProps.ts";
import {FC} from "react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm.tsx";
import {FilterButtons} from "features/ui/Todolists/Todolist/FilterButtons/FilterButtons.tsx";
import {useDispatch} from "react-redux";
import {addTaskAC} from "features/model/tasksReducer/tasksReducer.ts";
import {TodolistTitle} from "features/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "features/ui/Todolists/Todolist/Tasks/Tasks.tsx";

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
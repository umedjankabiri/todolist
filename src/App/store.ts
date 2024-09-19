import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import {todolistsReducer} from "model/todolistsReducer/todolistsReducer.ts";
import {tasksReducer} from "model/tasksReducer/tasksReducer.ts";

const rooReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = legacy_createStore(rooReducers)
export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store

import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import {todolistsReducer} from "model/todolistsReducer/todolistsReducer.ts";
import {tasksReducer} from "model/tasksReducer/tasksReducer.ts";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = legacy_createStore(rootReducers)
export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store

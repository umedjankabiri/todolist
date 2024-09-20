import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import {todolistsReducer} from "model/todolistsReducer/todolistsReducer.ts";
import {tasksReducer} from "model/tasksReducer/tasksReducer.ts";
import {themeReducer} from "model/themeReducer/themeReducer.ts";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    themes: themeReducer
})
export const store = legacy_createStore(rootReducers)
export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store

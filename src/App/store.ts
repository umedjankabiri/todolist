import { combineReducers, legacy_createStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "features/model/todolistsReducer/todolistsReducer.ts";
import { tasksReducer } from "features/model/tasksReducer/tasksReducer.ts";
import { themeReducer } from "features/model/themeReducer/themeReducer.ts";

const rootReducers = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  themes: themeReducer,
});
export const store = legacy_createStore(rootReducers);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;

import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux";
import { todolistsReducer } from "features/model/reducers/todolistsReducer.ts";
import { tasksReducer } from "features/model/reducers/tasksReducer.ts";
import { themeReducer } from "features/model/reducers/themeReducer.ts";
import { ThunkDispatch, thunk } from "redux-thunk";
import { statusReducer } from "features/model/reducers/statusReducer.ts";

const rootReducers = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  themes: themeReducer,
  status: statusReducer,
});
export const store = legacy_createStore(rootReducers, {}, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

// @ts-ignore
window.store = store;

import { RootState } from "App/store.ts";

export const selectStatus = (state: RootState) => state.status;

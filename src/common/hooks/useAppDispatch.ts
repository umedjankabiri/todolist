import { useDispatch } from "react-redux";
import { AppDispatch } from "App/store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

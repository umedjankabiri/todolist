import { useSelector } from "react-redux";
import { RootState } from "App/store.ts";

export const useAppSelector = useSelector.withTypes<RootState>();

import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector.ts";
import { selectStatus } from "common/selectors/statusSelector.ts";
import { useAppDispatch } from "common/hooks/useAppDispatch.ts";
import { setErrorAC } from "features/model/reducers/statusReducer.ts";

export const ErrorSnackBar = () => {
  const { error } = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);

  const onClickCloseHandler = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
    dispatch(setErrorAC("Test error message"));
  };

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={onClickCloseHandler}>
        <Alert onClose={onClickCloseHandler} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

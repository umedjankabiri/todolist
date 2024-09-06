import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import {MenuButtonProps} from "common/types/MenuBottons/MenuButtonProps.ts";

export const MenuButton = styled(Button)<MenuButtonProps>((props) => ({
    minWidth: "110px",
    fontWeight: "bold",
    boxShadow: `0 0 0 2px ${props.theme.palette.primary.dark}, 4px 4px 0 0 ${props.theme.palette.primary.light}`,
    borderRadius: "2px",
    textTransform: "capitalize",
    color: props.theme.palette.primary.contrastText,
    backgroundColor: props.background || "#1565C0",
    padding: "8px 24px",
    margin: "0 10px",
}))

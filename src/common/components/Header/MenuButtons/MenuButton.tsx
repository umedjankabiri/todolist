import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { MenuButtonProps } from "common/types/MenuBottons/MenuButtonProps.ts";

export const MenuButton = styled(Button)<MenuButtonProps>((props) => ({
  minWidth: "110px",
  fontWeight: "bold",
  boxShadow: `4px 4px 10px 0.5px ${"#504e4e"}`,
  borderRadius: "2px",
  textTransform: "capitalize",
  color: props.theme.palette.primary.contrastText,
  backgroundColor: props.background || "#087EA4",
  padding: "8px 24px",
  margin: "0 10px",
  "&:active": {
    transform: "translateY(2px)",
    boxShadow: `0 0 6px ${"#504e4e"}`,
  },
}));

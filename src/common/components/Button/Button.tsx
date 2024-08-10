import {ButtonProps} from "common/types/Button/ButtonProps.ts";
import {FC} from "react";

export const Button: FC<ButtonProps> = (props) => {
    return (
        <button>{props.title}</button>
    );
};
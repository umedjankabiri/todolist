import {ButtonProps} from "common/types/Button/ButtonProps.ts";

export const Button = (props: ButtonProps) => {
    return (
        <button>{props.title}</button>
    );
};
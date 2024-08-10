import {ButtonProps} from "common/types/Button/ButtonProps.ts";
import {FC} from "react";

export const Button: FC<ButtonProps> = (props) => {
    const onClickHandler = ()=> props.onClick

    return (
        <button onClick={onClickHandler}>{props.title}</button>
    );
};
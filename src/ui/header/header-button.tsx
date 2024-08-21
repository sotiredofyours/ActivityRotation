import { MouseEventHandler } from "react";
import "./header-button.css";

interface IHeaderButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

export function HeaderButton(props: IHeaderButtonProps) {


  return (
    <button className="header-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

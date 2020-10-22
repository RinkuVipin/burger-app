import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={[classes.Button, classes[props.buttonType]].join(" ")}
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  );
}

export default Button;

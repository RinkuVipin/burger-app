import React from "react";
import "./ButtonControl.css";

function ButtonControl(props) {
  return (
    <div className="button-control">
      <div className="label">{props.ingredientLabel}</div>
      <button className="more" onClick={props.moreClick}>
        More
      </button>
      <button
        className="less"
        onClick={props.lessClick}
        disabled={props.disableIngredient}
      >
        Less
      </button>
    </div>
  );
}

export default ButtonControl;

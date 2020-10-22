import React from "react";
import "./Backdrop.css";

function BackDrop(props) {
  return <div className="Backdrop" onClick={props.cancelOrder}></div>;
}

export default BackDrop;

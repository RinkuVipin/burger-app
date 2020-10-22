import React from "react";
import "./Hamburger.css";

function Hamburger(props) {
  return (
    <div className="Container" onClick={props.showSideDrawer}>
      <div className="Hamburger"></div>
      <div className="Hamburger"></div>
      <div className="Hamburger"></div>
    </div>
  );
}

export default Hamburger;

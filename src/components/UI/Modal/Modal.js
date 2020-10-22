import React, { Fragment } from "react";
import BackDrop from "../Backdrop/Backdrop";
import "./Modal.css";

function Modal(props) {
  return props.orderBurger ? (
    <Fragment>
      <BackDrop cancelOrder={props.cancelOrder} />
      <div className="Modal">
        <img src="images/cancel.png" alt="cancel" onClick={props.cancelOrder} />
        {props.children}
      </div>
    </Fragment>
  ) : null;
}

export default Modal;

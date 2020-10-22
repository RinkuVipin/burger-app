import React, { Fragment } from "react";
import OrderDetails from "./OrderDetails";
import Button from "../../UI/Button/Button";

function OrderSummary(props) {
  return (
    <Fragment>
      <OrderDetails />
      <Button buttonType="Success" clickHandler={props.burgerPurchase}>
        CONTINUE
      </Button>
      <Button buttonType="Danger" clickHandler={props.cancelOrder}>
        CANCEL
      </Button>
    </Fragment>
  );
}

export default OrderSummary;

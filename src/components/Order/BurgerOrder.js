import React from "react";
import Burger from "../Burger/Burger";
import OrderDetails from "../Burger/OrderSummary/OrderDetails";
import "./BurgerOrder.css";

function BurgerOrder(props) {
  return (
    <div className="course-body">
      <div className="course">
        <div className="course-preview">
          <h6>Your Delicious Burger</h6>
          <div className="course-preview-image">
            <Burger ingredientsList={props.ingredients} orderPage={true} />
          </div>
        </div>
        <div className="course-info">
          <div className="progress-container"></div>
          <div>
            <OrderDetails
              ingredients={props.ingredients}
              totalAmount={props.totalAmount}
            />
          </div>
          <div className="btn-container">
            <button onClick={props.clickContinue} className="btn">
              Continue
            </button>
            <button onClick={props.clickCancel} className="btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerOrder;

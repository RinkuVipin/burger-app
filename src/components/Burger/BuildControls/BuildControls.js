import React from "react";
import "./BuildControls.css";
import ButtonControl from "./ButtonControl/ButtonControl";
import { BURGER_BASE_PRICE } from "../constants";

const ingredientControls = [
  { ingredientLabel: "Meat", ingredientType: "meat" },
  { ingredientLabel: "Bacon", ingredientType: "bacon" },
  { ingredientLabel: "Cheese", ingredientType: "cheese" },
  { ingredientLabel: "Salad", ingredientType: "salad" },
];

function BurgerControls(props) {
  //Checks if the User is authenticated
  let buttonCaption = "Sign in to Order";
  if (props.isAuthenticated) buttonCaption = "Order Now!";

  const orderReady = props.totalAmount > BURGER_BASE_PRICE;

  return (
    <div className="build-controls">
      <h2>TOTAL PRICE : {props.totalAmount.toFixed(2)}</h2>
      {ingredientControls.map((element) => {
        return (
          <ButtonControl
            key={element.ingredientType}
            ingredientLabel={element.ingredientLabel}
            disableIngredient={props.disableIngredient[element.ingredientType]}
            moreClick={() => props.addIngredient(element.ingredientType)}
            lessClick={() => props.removeIngredient(element.ingredientType)}
          />
        );
      })}
      <button
        disabled={!orderReady}
        onClick={props.burgerOrderHandle}
        className="order-button"
      >
        {buttonCaption}
      </button>
    </div>
  );
}

export default BurgerControls;

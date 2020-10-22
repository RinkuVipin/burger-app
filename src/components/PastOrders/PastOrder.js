import React from "react";
import "./PastOrder.css";

function PastOrder(props) {
  //The ingredients are saved in an array from the props
  const ingredientsList = [];
  for (let ing in props.ingredients) {
    ingredientsList.push({
      name: ing,
      quantity: props.ingredients[ing],
    });
  }

  //Creating element for each Burger ingredients
  const ingredients = ingredientsList.map((ing) => {
    return (
      <span key={ing.name} className="past-order-ingredients">
        {ing.name} ({ing.quantity})
      </span>
    );
  });

  return (
    <div className="past-order-container">
      <p>
        {" "}
        <strong>Burger Order Id </strong> {props.orderId}
      </p>
      <p>{ingredients}</p>
      <h4>Price : Rs. {props.totalPrice.toFixed(2)}</h4>
    </div>
  );
}

export default PastOrder;

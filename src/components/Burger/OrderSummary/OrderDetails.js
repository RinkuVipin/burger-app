import React, { Fragment } from "react";
import { connect } from "react-redux";

function OrderDetails(props) {
  const ingredientList = [];

  for (let ingredient in props.ingredients) {
    ingredientList.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }
  const orderSummaryList = ingredientList.map((ing) => {
    return (
      <li
        style={{ textTransform: "capitalize", textAlign: "left" }}
        key={ing.name}
      >
        <strong>
          {ing.name} : {ing.amount}
        </strong>
      </li>
    );
  });

  return (
    <Fragment>
      <h2>Order Summary</h2>
      <p>Your delicious order contain following ingredients</p>
      <ul style={{ listStyle: "none" }}>{orderSummaryList}</ul>
      <h2 style={{ marginTop: "40px", color: "red" }}>
        Total Price : {props.totalAmount.toFixed(2)}
      </h2>
    </Fragment>
  );
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    totalAmount: state.burgerReducer.totalPrice,
  };
};

export default connect(mapStateToProps)(OrderDetails);

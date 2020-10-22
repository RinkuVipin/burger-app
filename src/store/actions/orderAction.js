import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_BEGIN,
  INITIALIZE_BURGER,
} from "./actionTypes";
import axios from "../../axios-burgerOrders";

//Handles the Spinner
export const purchaseBurgerBegin = () => {
  return {
    type: PURCHASE_BURGER_BEGIN,
  };
};

//Handles a Burger Purchase
export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerBegin());
    axios
      .post("/burgerOrders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

//Handles a Successful Purchase
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    orderId: id,
    order: orderData,
  };
};

//Handles a Failed Purchase
export const purchaseBurgerFailed = (error) => {
  return {
    type: PURCHASE_BURGER_FAILED,
    errorMessage: error,
  };
};

//This Redirects to Main Page after success Purchase
export const initializeBurger = () => {
  return {
    type: INITIALIZE_BURGER,
  };
};

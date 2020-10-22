import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAILED,
  PURCHASE_BURGER_BEGIN,
  INITIALIZE_BURGER,
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  isLoading: false,
  purchased: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    //Handles the Spinner
    case PURCHASE_BURGER_BEGIN:
      return {
        ...state,
        isLoading: true,
        purchased: false,
      };

    //Handles a Successful Purchase
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        isLoading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };

    //Handles a Failed Purchase
    case PURCHASE_BURGER_FAILED:
      return { ...state, isLoading: false };

    //This Redirects to Main Page after success Purchase
    case INITIALIZE_BURGER:
      return { ...state, purchased: false };

    default:
      return state;
  }
};

export default orderReducer;

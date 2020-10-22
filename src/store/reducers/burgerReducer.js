import {
  INGREDIENT_PRICES,
  BURGER_BASE_PRICE,
} from "../../components/Burger/constants";
import {
  ADD_INGREDIENT,
  INITIALIZE_INGREDIENTS,
  REMOVE_INGREDIENT,
} from "../actions/actionTypes";

const initialState = {
  ingredients: {
    cheese: 0,
    salad: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: BURGER_BASE_PRICE,
  isError: false,
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    //Adds a Ingredient to the Burger
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

    //Removes the Ingredient from the Burger
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

    //Initializes the Ingredients to its initial state
    case INITIALIZE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          cheese: 0,
          salad: 0,
          bacon: 0,
          meat: 0,
        },
        totalPrice: BURGER_BASE_PRICE,
      };
    default:
      return state;
  }
};

export default burgerReducer;

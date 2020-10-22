import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INITIALIZE_INGREDIENTS,
} from "./actionTypes";

//Adds a Ingredient to the Burger
export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredientName: ingredient,
  };
};

//Removes the Ingredient from the Burger
export const removeIngredient = (ingredient) => {
  return {
    type: REMOVE_INGREDIENT,
    ingredientName: ingredient,
  };
};

//Initializes the Ingredients to its initial state
export const initIngredients = () => {
  return {
    type: INITIALIZE_INGREDIENTS,
  };
};

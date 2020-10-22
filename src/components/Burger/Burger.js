import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import "./Burger.css";

const Burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredientsList)
    .map((ingredient) => {
      return [...Array(props.ingredientsList[ingredient])].map((_, index) => {
        return (
          <Ingredient key={ingredient + index} ingredientType={ingredient} />
        );
      });
    })
    .reduce((newArray, item) => {
      return newArray.concat(item);
    }, []);

  if (transformedIngredients.length === 0)
    transformedIngredients = <p className="initial-state">Add Ingredients</p>;

  let styleOrderBurger = null;
  if (props.orderPage) styleOrderBurger = { height: "400px" };
  return (
    <div className="Burger" style={styleOrderBurger}>
      <Ingredient ingredientType="bread-top" />
      {transformedIngredients}
      <Ingredient ingredientType="bread-bottom" />
    </div>
  );
};

export default Burger;

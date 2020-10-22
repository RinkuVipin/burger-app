import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

function NavigationItems(props) {
  return (
    <ul className="NavigationItems">
      <NavigationItem linkAddress="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem linkAddress="/orders">Orders</NavigationItem>
      ) : null}
      {props.isAuthenticated ? (
        <NavigationItem linkAddress="/signout">Sign out</NavigationItem>
      ) : (
        <NavigationItem linkAddress="/auth">Sign in</NavigationItem>
      )}
    </ul>
  );
}

export default NavigationItems;

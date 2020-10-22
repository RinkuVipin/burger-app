import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

function NavigationItem(props) {
  return (
    <li className="NavigationItem">
      <NavLink
        to={props.linkAddress}
        exact={props.exact}
        className={props.linkActive ? "active" : null}
      >
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavigationItem;

import React from "react";
import burgerLogo from "../../assets/images/burger-logo_edited.jpg";
import "./Logo.css";

function Logo() {
  return (
    <div className="Logo">
      <img className="Logo-img" src={burgerLogo} alt="logo" />
      <p className="Logo-title">BURGER WORLD</p>
    </div>
  );
}

export default Logo;

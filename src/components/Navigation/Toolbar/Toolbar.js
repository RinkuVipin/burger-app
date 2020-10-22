import React from "react";
import Logo from "../../Logo/Logo";
import Hamburger from "../../UI/Button/Hamburger";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./Toolbar.css";

function Toolbar(props) {
  return (
    <header className="Toolbar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Hamburger showSideDrawer={props.showSideDrawer} />
        <Logo />
      </div>

      <nav className="DesktopOnly">
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </header>
  );
}

export default Toolbar;

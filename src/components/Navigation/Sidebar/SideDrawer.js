import React, { Fragment } from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./SideDrawer.module.css";

function SideDrawer(props) {
  let sidebarClasses = [classes.Sidebar, classes.Close].join(" ");
  if (props.showSideDrawer)
    sidebarClasses = [classes.Sidebar, classes.Open].join(" ");
  return (
    <>
      {props.showSideDrawer ? (
        <Fragment>
          <Backdrop cancelOrder={props.closeSideDrawer} />
          <div className={sidebarClasses} onClick={props.closeSideDrawer}>
            <div className={classes.SidebarLogo}>
              <Logo />
            </div>
            <nav>
              <NavigationItems isAuthenticated={props.isAuthenticated} />
            </nav>
          </div>
        </Fragment>
      ) : null}
    </>
  );
}

export default SideDrawer;

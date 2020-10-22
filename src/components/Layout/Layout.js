import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SideDrawer from "../Navigation/Sidebar/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    isSideDrawerOpen: false,
  };

  openSideDrawer = () => {
    this.setState({
      isSideDrawerOpen: true,
    });
  };

  closeSideDrawer = () => {
    this.setState({
      isSideDrawerOpen: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar
          showSideDrawer={this.openSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          closeSideDrawer={this.closeSideDrawer}
          showSideDrawer={this.state.isSideDrawerOpen}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);

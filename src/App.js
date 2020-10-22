import React, { Component } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./components/Layout/Layout";
import PastOrders from "./components/PastOrders/PastOrders";
import Auth from "./components/Auth/Auth";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import classes from "./newStyle.module.css";
import Logout from "./components/Auth/Logout";
import { authUserValid } from "./store/actions/authAction";

class App extends Component {
  //Checks if the user is valid
  componentDidMount() {
    this.props.authUserValid();
  }

  render() {
    //Routes depending on the user authentication
    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Route path="/checkout" component={Checkout} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated)
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" exact component={PastOrders} />
          <Route path="/signout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );

    return (
      <div className={classes.App}>
        <header className={classes.Appheader}>
          <Layout>{routes}</Layout>
        </header>
      </div>
    );
  }
}

//Redux Store

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authUserValid: () => dispatch(authUserValid()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

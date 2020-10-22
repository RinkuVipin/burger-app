import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logOut } from "../../store/actions/authAction";

class Logout extends Component {
  //Removing Authentication Token and User ID
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

//Redux Store
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);

import React, { Component, Fragment } from "react";
import { authenticate } from "../../store/actions/authAction";
import { initializeBurger } from "../../store/actions/orderAction";
import { connect } from "react-redux";
import "./Auth.css";
import Spinner from "../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { BURGER_BASE_PRICE } from "../Burger/constants";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

//To display the Error message
const errors = {
  userName: "",
  userPassword: "",
};

//To validate if each input is valid
const validation = {
  userName: false,
  userPassword: false,
};

class Auth extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: "",
      userPassword: "",
      isFormValid: true,
      isSignUp: true,
    };
  }

  //Handles the Customer Details in State
  inputChangeHandler = (event) => {
    let inputName = event.target.name;
    this.setState({
      [inputName]: event.target.value,
    });
    this.validationCheck(inputName, event.target.value);
  };

  //Handles the Validation of each input
  validationCheck = (inputName, inputValue) => {
    switch (inputName) {
      case "userPassword":
        errors.userPassword =
          inputValue.length > 5
            ? ""
            : "Password must be at least 6 characters long!";
        validation.userPassword = errors.userPassword.length > 0 ? false : true;
        break;
      case "userName":
        errors.userName = validEmailRegex.test(inputValue)
          ? ""
          : "Email is not valid!";
        validation.userName = errors.userName.length > 0 ? false : true;
        break;
      default:
        errors.userPassword =
          inputValue.length > 5
            ? ""
            : "Password must be at least 6 characters long!";
        validation.userPassword = errors.userPassword.length > 0 ? false : true;
        break;
    }

    //Checks if the whole form is valid
    let isValid = true;
    for (const [key, value] of Object.entries(validation)) {
      isValid = value && isValid;
    }
    this.setState({
      isFormValid: isValid,
    });
  };

  //Submits the Login Form
  submitForm = (event) => {
    event.preventDefault();
    if (this.state.isFormValid) {
      this.props.onAuthenticate(
        this.state.userName,
        this.state.userPassword,
        this.state.isSignUp
      );
    }
  };

  //Switches to Signin or SignUp
  switchToSignUp = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };

  render() {
    //Sets the Caption on the Button
    let primaryButton = "Sign up";
    let secondaryButton = "Sign in";
    if (!this.state.isSignUp) {
      primaryButton = "Sign in";
      secondaryButton = "Sign up";
    }

    //Error Messages
    let errorMessage = null;
    let errorSummary = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
      errorSummary = <h4 className="error-message">{errorMessage}</h4>;
    }

    //SIGN IN FORM
    let form = (
      <form onSubmit={this.submitForm} className="auth-container">
        <div className="imgcontainer">
          <img
            src="https://x.dpstatic.com/d/avatars/l/905/905144.jpg?1511195787"
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="container">
          {errorSummary}
          {errors.userName.length > 0 && (
            <label className="invalid">{errors.userName}</label>
          )}
          <input
            type="text"
            placeholder="Enter Username"
            value={this.state.userName}
            onChange={this.inputChangeHandler}
            name="userName"
            required
          />

          {errors.userPassword.length > 0 && (
            <label className="invalid">{errors.userPassword}</label>
          )}
          <input
            type="password"
            placeholder="Enter Password"
            name="userPassword"
            value={this.state.userPasswordname}
            onChange={this.inputChangeHandler}
            required
          />

          <button type="submit" className="loginbtn">
            {primaryButton}
          </button>

          <button
            type="button"
            className="loginbtn signin"
            onClick={this.switchToSignUp}
          >
            {secondaryButton}
          </button>
        </div>
      </form>
    );

    //Displays Spinner
    if (this.props.isLoading)
      form = (
        <div className="auth-container">
          <div style={{ height: "400px", display: "flex" }}>
            <div style={{ margin: "0 auto", marginTop: "100px" }}>
              <Spinner />
            </div>
          </div>
        </div>
      );

    //Redirects once user is authenticated
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.totalPrice > BURGER_BASE_PRICE) {
        this.props.initializeBurger();
        authRedirect = <Redirect to="/checkout" />;
      } else authRedirect = <Redirect to="/" />;
    }

    return (
      <Fragment>
        {authRedirect}
        <div className="all-container">{form}</div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !== null,
    totalPrice: state.burgerReducer.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    initializeBurger: () => dispatch(initializeBurger()),
    onAuthenticate: (userName, userPassword, isSignUp) =>
      dispatch(authenticate(userName, userPassword, isSignUp)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);

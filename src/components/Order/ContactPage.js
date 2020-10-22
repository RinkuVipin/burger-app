import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/UI/Spinner/Spinner";
import { purchaseBurger } from "../../store/actions/orderAction";
import "./ContactPage.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

//To display the Error message
const errors = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

//To validate if each input is valid
const validation = {
  name: false,
  email: false,
  address: false,
  phone: false,
};

class ContactPage extends Component {
  constructor(props) {
    super();
    this.state = {
      customerName: "",
      customerEmail: "",
      customerAddress: "",
      customerPhone: "",
      deliveryType: "Express",
      isFormValid: true,
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
      case "customerName":
        errors.name =
          inputValue.length > 5
            ? ""
            : "Full Name must be at least 6 characters long!";
        validation.name = errors.name.length > 0 ? false : true;
        break;
      case "customerEmail":
        errors.email = validEmailRegex.test(inputValue)
          ? ""
          : "Email is not valid!";
        validation.email = errors.email.length > 0 ? false : true;
        break;
      case "customerAddress":
        errors.address =
          inputValue.length > 11
            ? ""
            : "Address must be at least 12 characters long!";
        validation.address = errors.address.length > 0 ? false : true;
        break;
      case "customerPhone":
        errors.phone =
          inputValue.length === 10
            ? ""
            : "Phone Number must be 10 characters long!";
        validation.phone = errors.phone.length > 0 ? false : true;
        break;
      default:
        errors.phone =
          inputValue.length > 10
            ? ""
            : "Phone Number must be 10 characters long!";
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

  //Submits the Burger Order
  orderBurger = (event) => {
    event.preventDefault();

    if (this.state.isFormValid) {
      const burgerOrder = {
        ingredients: this.props.ingredientsList,
        totalPrice: this.props.totalAmount,
        customer: {
          name: this.state.customerName,
          address: this.state.customerAddress,
          email: this.state.customerEmail,
          phone: this.state.customerPhone,
        },
        deliveryType: this.state.deliveryType,
        userId: this.props.userId,
      };
      this.props.purchaseBurger(burgerOrder, this.props.token);
    }
  };

  render() {
    let form = <Spinner />;
    if (!this.props.isLoading)
      form = (
        <form onSubmit={this.orderBurger}>
          <div className="contact-container">
            {errors.name.length > 0 && (
              <span className="error">{errors.name}</span>
            )}
            <input
              type="text"
              id="customerName"
              name="customerName"
              placeholder="Your name.."
              value={this.state.customerName}
              onChange={this.inputChangeHandler}
              required
            />

            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
            <input
              type="text"
              id="customerEmail"
              name="customerEmail"
              placeholder="Your Email.."
              value={this.state.customerEmail}
              onChange={this.inputChangeHandler}
              required
            />
            {errors.phone.length > 0 && (
              <span className="error">{errors.phone}</span>
            )}
            <input
              type="number"
              id="customerPhone"
              name="customerPhone"
              placeholder="Your Phone Number.."
              value={this.state.customerPhone}
              onChange={this.inputChangeHandler}
              required
            />

            <select
              id="deliveryType"
              name="deliveryType"
              value={this.state.deliveryType}
              onChange={this.inputChangeHandler}
            >
              <option value="express">
                Express Delivery(within 30minutes)
              </option>
              <option value="standard">
                Standard Delivery (within an hour)
              </option>
            </select>
            {errors.address.length > 0 && (
              <span className="error">{errors.address}</span>
            )}
            <textarea
              id="customerAddress"
              name="customerAddress"
              placeholder="Delivery Address."
              style={{ height: "200px" }}
              value={this.state.customerAddress}
              onChange={this.inputChangeHandler}
              required
            ></textarea>
            <input type="submit" value="Order" />
          </div>
        </form>
      );
    if (this.props.purchaseSuccess) form = <Redirect to="/" />;
    return (
      <div>
        <h2>Enter the Delivery Details</h2>
        <div className="delivery-contact-container">
          <div className="delivery-contact-container-image"></div>
          <div>{form}</div>
        </div>
      </div>
    );
  }
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    ingredientsList: state.burgerReducer.ingredients,
    totalAmount: state.burgerReducer.totalPrice,
    isLoading: state.orderReducer.isLoading,
    purchaseSuccess: state.orderReducer.purchased,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    purchaseBurger: (burgerOrder, token) =>
      dispatch(purchaseBurger(burgerOrder, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

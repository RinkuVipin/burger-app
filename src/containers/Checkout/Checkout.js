import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { BURGER_BASE_PRICE } from "../../components/Burger/constants";
import BurgerOrder from "../../components/Order/BurgerOrder";
import ContactPage from "../../components/Order/ContactPage";


class Checkout extends Component {
  //Handling the Cancel Order
  clickCancel = () => {
    this.props.history.goBack();
  };

  //Handling the Order
  clickContinue = () => {
    this.props.history.replace("/checkout/delivery");
  };

  render() {
    let burgerOrder = <Redirect to="/" />;

    if (this.props.totalAmount !== BURGER_BASE_PRICE) {
      //Redirects after Success Purchase
      const purchaseRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      burgerOrder = (
        <div>
          {purchaseRedirect}
          <BurgerOrder
            ingredients={this.props.ingredientsList}
            totalAmount={this.props.totalAmount}
            clickCancel={this.clickCancel}
            clickContinue={this.clickContinue}
          />
          <Route path={"/checkout/delivery"} component={ContactPage} />
        </div>
      );
      return burgerOrder;
    }
  }
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    ingredientsList: state.burgerReducer.ingredients,
    totalAmount: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);

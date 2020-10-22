import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import "./BurgerBuilder.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
} from "../../store/actions/burgerAction";
import { initializeBurger } from "../../store/actions/orderAction";

class BurgerBuilder extends Component {
  constructor() {
    super();
    this.state = {
      orderBurger: false,
      isLoading: false,
    };
  }

  //This method initialises the ingredients to 0
  componentDidMount() {
    this.props.initIngredients();
  }
  //This method handles the ordering of a Burger
  burgerOrderHandler = () => {
    if (this.props.isAuthenticated)
      this.setState({
        orderBurger: true,
      });
    else this.props.history.push("/auth");
  };

  //This method handles the cancelling of a Burger Order
  burgerCancelHandler = () => {
    this.setState({
      orderBurger: false,
    });
  };

  //This method handles the purchasing of a Burger Order
  burgerPurchaseHandler = () => {
    this.props.initializeBurger();
    this.props.history.push("/checkout");
  };

  render() {
    //Checks if the LESS Button should be disabled
    const isIngredientDisabled = {
      ...this.props.ingredientsList,
    };
    for (let key in isIngredientDisabled) {
      isIngredientDisabled[key] = isIngredientDisabled[key] <= 0;
    }

    //Checks if Spinner is needed
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredientsList}
        totalAmount={this.props.burgerAmount}
        burgerPurchase={this.burgerPurchaseHandler}
        cancelOrder={this.burgerCancelHandler}
      />
    );
    if (this.state.isLoading) orderSummary = <Spinner />;

    return (
      <Fragment>
        <Modal
          orderBurger={this.state.orderBurger}
          cancelOrder={this.burgerCancelHandler}
        >
          {orderSummary}
        </Modal>
        {this.props.isError ? (
          <h2 className="error">Something went wrong !</h2>
        ) : null}
        <div className="container">
          <Burger ingredientsList={this.props.ingredientsList} />
          <BurgerControls
            addIngredient={this.props.addIngredient}
            removeIngredient={this.props.removeIngredient}
            disableIngredient={isIngredientDisabled}
            totalAmount={this.props.burgerAmount}
            burgerOrderHandle={this.burgerOrderHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </div>
      </Fragment>
    );
  }
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    ingredientsList: state.burgerReducer.ingredients,
    burgerAmount: state.burgerReducer.totalPrice,
    isError: state.burgerReducer.isError,
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
    removeIngredient: (ingredientName) =>
      dispatch(removeIngredient(ingredientName)),
    initializeBurger: () => dispatch(initializeBurger()),
    initIngredients: () => dispatch(initIngredients()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(BurgerBuilder);

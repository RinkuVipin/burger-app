import axios from "../../axios-burgerOrders";
import { connect } from "react-redux";
import React, { Component } from "react";
import PastOrder from "./PastOrder";
import Spinner from "../UI/Spinner/Spinner";

//Styling the Error message and Spinner
const divStyle = {
  position: " absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  padding: "60px",
  fontWeight: "bold",
};

class PastOrders extends Component {
  state = {
    orderList: [],
    isLoading: false,
    isError: false,
  };

  //Reading the Data from Firebase
  componentDidMount() {
    this.setState({ isLoading: true });
    const token = this.props.token;
    const userId = this.props.userId;
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/burgerOrders.json" + queryParams)
      .then((response) => {
        const pastOrderList = [];
        for (let key in response.data) {
          pastOrderList.push({
            id: key,
            ...response.data[key],
          });
        }
        this.setState({
          orderList: pastOrderList,
          isLoading: false,
          isError: false,
        });
      })
      .catch((error) => {
        
        this.setState({ isLoading: false, isError: true });
      });
  }

  render() {
    let errorMessage = (
      <div
        style={{
          ...divStyle,
          boxShadow: "8px 6px brown",
          border: "5px solid red",
        }}
      >
        "Oops. Something went wrong !"
      </div>
    );
    let spinner = (
      <div style={divStyle}>
        <Spinner />
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? spinner : null}
        {this.state.isError ? errorMessage : null}
        {this.state.orderList.map((order) => (
          <PastOrder
            key={order.id}
            orderId={order.id}
            ingredients={order.ingredients}
            totalPrice={+order.totalPrice}
          />
        ))}
      </div>
    );
  }
}

//Redux Store
const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

export default connect(mapStateToProps)(PastOrders);

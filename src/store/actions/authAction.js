import Axios from "axios";
import {
  AUTH_BEGIN,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "./actionTypes";

//User Log out
export const logOut = () => {
  //Clears the Local Storage
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expiresAt");
  return {
    type: AUTH_LOGOUT,
  };
};

//Authentication Token Timeout Check
export const checkTokenTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expiresIn * 1000);
  };
};

//Authentication Check begins
export const authBegin = () => {
  return {
    type: AUTH_BEGIN,
  };
};

//Authentication Check Success
export const authSuccess = (token, userId) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};

//Authentication Check Fails
export const authFailed = (error) => {
  return {
    type: AUTH_FAILED,
    error: error,
  };
};

//Authentication Check
export const authenticate = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authBegin());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCM6lcstmjwgcebqyk2szhgdQxsEra572w";
    if (!isSignUp)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCM6lcstmjwgcebqyk2szhgdQxsEra572w";
    Axios.post(url, authData)
      .then((response) => {
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkTokenTimeout(response.data.expiresIn));
        //Local Storage for Token
        const expiresAt = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expiresAt", expiresAt);
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data.error));
      });
  };
};

export const authUserValid = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiresAt = new Date(localStorage.getItem("expiresAt"));
    if (!token) {
      dispatch(logOut());
    } else {
      if (expiresAt > new Date()) {
        dispatch(authSuccess(token, userId));
        dispatch(
          checkTokenTimeout((expiresAt.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

import {
  AUTH_BEGIN,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  token: null,
  userId: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.token,
        userId: action.userId,
        error: null,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoading: false,
        token: null,
        userId: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;

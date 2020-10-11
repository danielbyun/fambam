import {
  REGISTER_USER_FAIL,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
} from "../types/authTypes";

const initialState = {
  validToken: null,
  authenticated: "",
  loginLoading: false,
  loginErrorMessage: "",
  loginSuccess: false,
  registerLoading: false,
  registerErrorMessage: "",
  registerSuccess: false,
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_USER_START:
      return {
        ...state,
        loginLoading: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loginLoading: false,
        loginErrorMessage: payload,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        validToken: payload,
        loginLoading: false,
        loginSuccess: true,
      };
    case REGISTER_USER_START:
      return {
        ...state,
        registerLoading: true,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        registerLoading: false,
        registerErrorMessage: payload,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        authenticated: true,
        validToken: payload,
        registerLoading: false,
        registerSuccess: true,
      };
    default:
      return state;
  }
};

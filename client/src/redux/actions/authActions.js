import axios from "axios";
import {
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_START,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_START,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
} from "../types/authTypes";

export const signInStart = () => ({
  type: LOGIN_USER_START,
});

export const signInError = (error) => ({
  type: LOGIN_USER_FAIL,
  payload: error,
});

export const signInSuccess = (token) => ({
  type: LOGIN_USER_SUCCESS,
  payload: token,
});

export const signInStartAsync = (form, callback) => async (dispatch) => {
  try {
    await axios
      .post("http://localhost:3090/signin", form)
      .then((res) => {
        const { token } = res.data;
        dispatch(signInSuccess(token));
        localStorage.setItem("token", token);
        callback();
      })
      .catch((err) => {
        console.error(err);
        dispatch(signInError(err));
      });
  } catch (error) {
    console.error(error);
    dispatch(signInError(error));
  }
};

export const signOutStart = () => ({
  type: LOGOUT_USER_START,
});

export const signOutError = (error) => ({
  type: LOGOUT_USER_FAIL,
  payload: error,
});

export const signOutSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const signOutStartAsync = (form, callback) => async (dispatch) => {
  dispatch(signOutStart());
  try {
    localStorage.removeItem("token");
    dispatch(signOutSuccess());
    callback();
  } catch (error) {
    dispatch(signOutError(error));
  }
};

export const registerStart = () => ({
  type: REGISTER_USER_START,
});

export const registerError = (error) => ({
  type: REGISTER_USER_FAIL,
  payload: error,
});

export const registerSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

export const registerStartAsync = (form, callback) => async (dispatch) => {
  console.log("signup");
  try {
    await axios
      .post("http://localhost:3090/signup", form)
      .then((res) => {
        const { token } = res.data;
        dispatch(registerSuccess(token));
        localStorage.setItem("token", token);
        // callback();
      })
      .catch((err) => {
        if (err.response) {
          const { data, status } = err.response;
          console.log(status);
          console.error(data.error);
          dispatch(registerError(data.error));
        }
      });
  } catch (error) {
    console.error(error);
    dispatch(registerError(error));
  }
};

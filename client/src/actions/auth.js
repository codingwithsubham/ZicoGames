import axios from "axios";
import {
  USER_LOADED,
  LOGOUT,
  LOGIN_SUCCESS,
  SETTINGS_LOADING_ERROR,
  LOGIN_FAIL,
  RESET_ERROR,
  REGISTER_SUCCESS,
  USERS_LOADED,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert"
const { API_CONFIG } = require("../common/constants");

//Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  window.location.reload();
};

// Self Registration
export const selfRegistration = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/self-register", {}, API_CONFIG);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    setAlert("Self Registration Successfull", "success");
  } catch (err) {
    setAlert("Self Registration Failed", "danger");
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/load-user", API_CONFIG);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: err,
    // });
  }
};

// Update App Global Settings
export const register = (body) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_ERROR,
    });
    const res = await axios.post("/api/auth/register", body, API_CONFIG);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Welcome to Zico", "success"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

//Login
export const login = (body) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_ERROR,
    });
    const res = await axios.post("/api/auth/login", body, API_CONFIG);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Welcome Back", "success"));
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err?.response?.data?.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

// update Bank
export const updateUserBank = (body) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/auth/update-user/bank",
      body,
      API_CONFIG
    );
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: SETTINGS_LOADING_ERROR,
    });
  }
};

// forgot password
export const forgotPassword = (mobile) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/forgot-password",{mobile}, API_CONFIG);
    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    errors.map(i => dispatch(setAlert(i.msg, "danger")));  
  }
};

// reset password
export const resetPassword = (password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/reset-password",{password}, API_CONFIG);
    dispatch(setAlert(res.data, "success"));
  } catch (err) {
    dispatch(setAlert("Server Error", "success"));
  }
};

// fgetUserByMob
export const validateUser = (mobile) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/auth/validate/${mobile}`, API_CONFIG);
    dispatch(setAlert("User Verified !!", "success"));
    return res.data;
  } catch (err) {
    dispatch(setAlert("User Not Found !!", "danger"));
  }
};

// get users
export const loadUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/load-users", API_CONFIG);
    dispatch({
      type: USERS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Can Not Fetch Team at This Moment", "success"));
  }
};

// get users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth/get-users", API_CONFIG);
    dispatch({
      type: USERS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Can Not Fetch Team at This Moment", "success"));
  }
};